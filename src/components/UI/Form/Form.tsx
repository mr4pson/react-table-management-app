import classNames from 'classnames';
import { ChangeEvent, FormEvent } from 'react';
import { TypeFieldValidation, TypeFormValidation } from '../../../type';
import styles from './Form.module.scss';
import { FormType, TypeUserInfo } from './type';

type IProps = {
  type: string,
  userInfo: TypeUserInfo,
  userInfoValidation: TypeFormValidation,
  setUserInfo: (userInfo: TypeUserInfo) => void,
  addNewUser: (user: TypeUserInfo) => void,
}

const Form = (props: IProps) => {
  const getFormClassNames = () => {
    return classNames(styles['form'], {
      [styles['form_vertical']]: props.type === FormType.Vertical,
      [styles['form_horizontal']]: props.type === FormType.Horizontal,
    });
  }
  const getFormInputClassNames = (field: TypeFieldValidation) => {
    return classNames(styles['form__input'], {
      [styles['form__input_invalid']]: field.valid && !field.touched || !field.valid && field.touched,
    });
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.addNewUser(props.userInfo);
  }
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setUserInfo({...props.userInfo, [event.target.name]: event.target.value});
  }
  const { name, surname, age, city } = props.userInfoValidation;
  return (
    <form onSubmit={handleSubmit} className={getFormClassNames()}>
      <div className={styles['container']}>
        <input onChange={onFieldChange} name="name" value={props.userInfo.name} className={getFormInputClassNames(name)} placeholder="Name"/>
        <input onChange={onFieldChange} name="surname" value={props.userInfo.surname} className={getFormInputClassNames(surname)} placeholder="Surname"/>
        <input onChange={onFieldChange} name="age" value={props.userInfo.age} className={getFormInputClassNames(age)} type="number" placeholder="Age"/>
        <input onChange={onFieldChange} name="city" value={props.userInfo.city} className={getFormInputClassNames(city)} placeholder="City"/>
        <button className={styles['form__submit']}>ADD</button>
      </div>
    </form>
  )
}

export default Form;