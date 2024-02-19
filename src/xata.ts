// Generated by Xata Codegen 0.29.1. Please do not edit..
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "User",
    columns: [
      { name: "userId", type: "string", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "owner", table: "Board" },
      { column: "owner", table: "Org" },
    ],
  },
  {
    name: "Todo",
    columns: [
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "description", type: "string", notNull: true, defaultValue: "" },
      { name: "order", type: "int" },
      {
        name: "isCompleted",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      { name: "list", type: "link", link: { table: "List" } },
    ],
  },
  {
    name: "List",
    columns: [
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "description", type: "string", notNull: true, defaultValue: "" },
      { name: "order", type: "int" },
      { name: "board", type: "link", link: { table: "Board" } },
    ],
    revLinks: [{ column: "list", table: "Todo" }],
  },
  {
    name: "Board",
    columns: [
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "imageThumbUrl", type: "string" },
      { name: "imageFullUrl", type: "string" },
      { name: "imageUserName", type: "string" },
      { name: "imageLinkHTML", type: "string" },
      { name: "owner", type: "link", link: { table: "User" } },
      { name: "organization", type: "link", link: { table: "Org" } },
    ],
    revLinks: [{ column: "board", table: "List" }],
  },
  {
    name: "Org",
    columns: [
      { name: "orgId", type: "string", notNull: true, defaultValue: "" },
      { name: "count", type: "int" },
      { name: "owner", type: "link", link: { table: "User" } },
    ],
    revLinks: [{ column: "organization", table: "Board" }],
  },
  {
    name: "OrgSubscription",
    columns: [
      { name: "orgId", type: "string" },
      { name: "stripeCustomerId", type: "string" },
      { name: "stripeSubscriptionId", type: "string" },
      { name: "stripePriceId", type: "string" },
      { name: "stripeCurrentPeriodEnd", type: "datetime" },
    ],
  },
  {
    name: "AuditLog",
    columns: [
      { name: "action", type: "string" },
      { name: "boardId", type: "string" },
      { name: "orgId", type: "string" },
      { name: "entityId", type: "string" },
      { name: "entityType", type: "string" },
      { name: "entityTitle", type: "string" },
      { name: "userId", type: "string" },
      { name: "userImage", type: "string" },
      { name: "userName", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type Todo = InferredTypes["Todo"];
export type TodoRecord = Todo & XataRecord;

export type List = InferredTypes["List"];
export type ListRecord = List & XataRecord;

export type Board = InferredTypes["Board"];
export type BoardRecord = Board & XataRecord;

export type Org = InferredTypes["Org"];
export type OrgRecord = Org & XataRecord;

export type OrgSubscription = InferredTypes["OrgSubscription"];
export type OrgSubscriptionRecord = OrgSubscription & XataRecord;

export type AuditLog = InferredTypes["AuditLog"];
export type AuditLogRecord = AuditLog & XataRecord;

export type DatabaseSchema = {
  User: UserRecord;
  Todo: TodoRecord;
  List: ListRecord;
  Board: BoardRecord;
  Org: OrgRecord;
  OrgSubscription: OrgSubscriptionRecord;
  AuditLog: AuditLogRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Hortsoft-s-workspace-cftmdl.ap-southeast-2.xata.sh/db/gz_tasks",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};