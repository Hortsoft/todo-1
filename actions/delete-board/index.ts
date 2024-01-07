"use server";
import { getXataClient } from "@/lib/utils/xata";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

import { redirect } from "next/navigation";
import { DeleteBoard } from "./schema";
import { deleteList } from "../delete-list";
import { createAuditLog } from "@/lib/create-audit-log";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  const xata = getXataClient();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;
  const owner = await xata.db.User.search(userId);
  try {
    // Ensure the Board is owned by our user
    const existingRecord = await xata.db.Board.filter({
      owner: owner.records[0].id,
      id: id,
    }).getFirst();
    if (!existingRecord) {
      return {
        error: "Board not found",
      };
    }
    //get all lists associated with the board
    const lists = await xata.db.List.filter({
      board: id,
    }).getMany();

    // await delete all the lists
    const listPromises = lists.map(async (list) => {
      await deleteList({
        id: list.id,
        boardId: id,
      });
    });

    const deletedLists = await Promise.all(listPromises);

    //delete board
    const deletedBoard = await xata.db.Board.delete(id);

    await createAuditLog({
      entityTitle: deletedBoard?.title!,
      entityId: deletedBoard?.id!,
      entityType: "BOARD",
      action: "DELETE",
      boardId: deletedBoard?.id!,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/dashboard}`);
  redirect(`/dashboard`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
