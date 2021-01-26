import { TypeUserInfo } from "../Form/type";

export type TypeTable = {
  id: string;
  rows: TypeUserInfo[];
}

export enum TypeRowButton {
  Edit = 'edit',
  Delete = 'delete',
}

export enum TypeTableButton {
  Copy = 'copy',
  Remove = 'remove',
}