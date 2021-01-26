class IObjectKeys {
  [key: string]: string | boolean;
}

export enum FormType {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export class TypeUserInfo extends IObjectKeys {
  id: string;
  name: string;
  surname: string;
  age?: string;
  city: string;
}