import styles from './App.module.scss';
import Form from './components/UI/Form';
import classNames from 'classnames';
import { FormType, TypeUserInfo } from './components/UI/Form/type';
import { useState } from 'react';

const defaultUserInfo: TypeUserInfo = {
  id: null,
  name: '',
  surname: '',
  age: '',
  city: '',
}

function App() {
  const [userInfo, setUserInfo] = useState<TypeUserInfo>(defaultUserInfo);
  const [users, setUsers] = useState<TypeUserInfo[]>([]);
  const handleSetUserInfo = (userInfo: TypeUserInfo) => {
    setUserInfo({...userInfo, id: users.length});
  }
  const addNewUser = (user: TypeUserInfo) => {
    setUsers(users.concat(user));
  }
  return (
    <div className={classNames(styles['app'], styles['container'])}>
      <div className={styles['app__forms']}>
        <Form addNewUser={addNewUser} userInfo={userInfo} setUserInfo={handleSetUserInfo} type={FormType.Vertical} />
        <Form addNewUser={addNewUser} userInfo={userInfo} setUserInfo={handleSetUserInfo} type={FormType.Horizontal} />
      </div>
    </div>
  );
}

export default App;
