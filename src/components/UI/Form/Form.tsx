import styles from './Form.module.scss';
import classNames from 'classnames';
import { FormType, TypeUserInfo } from './type';
import { ChangeEvent, FormEvent } from 'react';

type IProps = {
  type: string,
  userInfo: TypeUserInfo,
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.addNewUser(props.userInfo);
  }
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setUserInfo({...props.userInfo, [event.target.name]: event.target.value});
  }
  return (
    <form onSubmit={handleSubmit} className={getFormClassNames()}>
      <div className={styles['container']}>
        <input onChange={onFieldChange} name="name" value={props.userInfo.name} className={styles['form__input']} placeholder="Name"/>
        <input onChange={onFieldChange} name="surname" value={props.userInfo.surname} className={styles['form__input']} placeholder="Surname"/>
        <input onChange={onFieldChange} name="age" value={props.userInfo.age} className={styles['form__input']} placeholder="Age"/>
        <input onChange={onFieldChange} name="city" value={props.userInfo.city} className={styles['form__input']} placeholder="City"/>
        <button className={styles['form__submit']}>ADD</button>
      </div>
    </form>
  )
}

export default Form;