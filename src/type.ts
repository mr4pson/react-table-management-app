import { TypeTable } from "./components/UI/Table/type"

export type TypeModalData = {
  data: TypeTable;
  index: number;
}

export type TypeFieldValidation = {
  touched: boolean;
  valid: boolean;
}

export type TypeFormValidation = {
  [key: string]: TypeFieldValidation;
}
