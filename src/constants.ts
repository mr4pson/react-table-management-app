import { TypeUserInfo } from "./components/UI/Form/type"
import { TypeTable } from "./components/UI/Table/type"
import { TypeFormValidation, TypeModalData } from "./type"
import * as uuid from 'uuid'; 

export const DEFAULT_USER_INFO: TypeUserInfo = {
  id: null,
  name: '',
  surname: '',
  age: '',
  city: '',
}

export const DEFAULT_TABLES: TypeTable[] = [
  {
    id: uuid.v4(),
    rows: [
      {
        id: uuid.v4(),
        name: 'Name',
        surname: 'Surname',
        age: 'Age',
        city: 'City',
      }
    ],
  }
]

export const DEFAULT_MODAL_DATA: TypeModalData = {
  data: {
    id: uuid.v4(),
    rows: [],
  },
  index: null,
}

export const DEFAULT_USER_INFO_VALIDATION: TypeFormValidation = {
  name: { touched: false, valid: false },
  surname: { touched: false, valid: false },
  age: { touched: false, valid: false },
  city: { touched: false, valid: false },
}

export const DEFAULT_USER_INFO_MODAL_VALIDATION: TypeFormValidation = {
  name: { touched: false, valid: false },
  surname: { touched: false, valid: false },
  city: { touched: false, valid: false },
}
