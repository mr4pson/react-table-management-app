import styles from './App.module.scss';
import Form from './components/UI/Form';
import classNames from 'classnames';
import { FormType, TypeUserInfo } from './components/UI/Form/type';
import { ChangeEvent, useState } from 'react';
import TablesContainer from './components/containers/TableContainer';
import { TypeTable } from './components/UI/Table/type';
import * as uuid from 'uuid'; 
import Modal from './components/UI/Modal';
import { TypeModalData, TypeFormValidation, TypeFieldValidation } from './type';
import { DEFAULT_MODAL_DATA, DEFAULT_TABLES, DEFAULT_USER_INFO, DEFAULT_USER_INFO_MODAL_VALIDATION, DEFAULT_USER_INFO_VALIDATION } from './constants';

function App() {
  const [userInfo, setUserInfo] = useState<TypeUserInfo>(DEFAULT_USER_INFO);
  const [userInfoValidation, setUserInfoValidation] = useState<TypeFormValidation>(DEFAULT_USER_INFO_VALIDATION);
  const [userInfoModalValidation, setUserInfoModalValidation] = useState<TypeFormValidation>(DEFAULT_USER_INFO_MODAL_VALIDATION);
  const [tables, setTables] = useState<TypeTable[]>(DEFAULT_TABLES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TypeModalData>(DEFAULT_MODAL_DATA);
  const [isAgreed, setisAgreed] = useState<boolean>(false);

  const getFormInputClassNames = (field: TypeFieldValidation) => {
    return classNames(styles['modal-form__input'], {
      [styles['modal-form__input_invalid']]: field.valid && !field.touched || !field.valid && field.touched,
    });
  }

  const handleSetUserInfo = (userInfo: TypeUserInfo) => {
    setUserInfo({...userInfo});
    const newUserInfoValidation = {...userInfoValidation};
    for (const field in userInfoValidation) {
      newUserInfoValidation[field].valid = !!userInfo[field].toString().length;
      if (userInfo[field].toString().length) {
        newUserInfoValidation[field].touched = true;
      }
    }
    setUserInfoValidation(newUserInfoValidation);
  }
  const addNewUser = (user: TypeUserInfo) => {
    const tableList = [...tables];
    const firstTable = tableList[0];
    firstTable.rows.push({ ...user, id: uuid.v4() });
    setTables(tableList);
    setUserInfo(DEFAULT_USER_INFO);
  }
  const handleRowDelete = (table: TypeTable) => {
    const newTables = [...tables];
    let currentTable = newTables.find(table => table.id === table.id);
    currentTable = table;
    setTables(newTables);
  }
  const handleTableRemove = (table: TypeTable) => {
    const newTables = [...tables];
    const index = tables.findIndex(curTable => curTable.id === table.id);
    newTables.splice(index, 1);
    setTables(newTables);
  }
  const handleTableCopy = (table: TypeTable) => {
    const index = tables.findIndex(curTable => curTable.id === table.id);
    const newTables = [...tables.slice(0, index + 1)];
    newTables.push({rows: table.rows.map(row => ({...row, id: uuid.v4()})), id: uuid.v4()});
    setTables([...newTables.concat(tables.slice(index + 1, tables.length))]);
  }
  const handleRowEdit = (table: TypeTable, index: number) => {
    setModalData({ data: table, index });
    toggleModal();
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = JSON.parse(JSON.stringify(modalData.data));
    data.rows[modalData.index] = { ...data.rows[modalData.index], [event.target.name]: event.target.value };
    setModalData({ data, index: modalData.index });

    const newUserInfoModalValidation = userInfoModalValidation;
    for (const field in newUserInfoModalValidation) {
      newUserInfoModalValidation[field].valid = !!data.rows[modalData.index][field].toString().length;
      if (data.rows[modalData.index][field].toString().length) {
        newUserInfoModalValidation[field].touched = true;
      }
    }
    setUserInfoModalValidation(newUserInfoModalValidation);
  }
  const handleOnSave = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTables = [...tables];
    let curTable = newTables.find(table => modalData.data.id === table.id);
    curTable.rows = modalData.data.rows;
    setTables(newTables);
    toggleModal();
  }
  const onToggleAgree = () => {
    setisAgreed(!isAgreed);
  }
  const curRow = {...modalData.data.rows[modalData.index]};
  const { name, surname, city } = userInfoModalValidation;
  return (
    <div className={classNames(styles['app'], styles['container'])}>
      <div className={styles['app__forms']}>
        <Form
          type={FormType.Vertical}
          userInfo={userInfo}
          userInfoValidation={userInfoValidation}
          addNewUser={addNewUser}
          setUserInfo={handleSetUserInfo}
        />
        <Form
          type={FormType.Horizontal}
          userInfo={userInfo}
          userInfoValidation={userInfoValidation}
          addNewUser={addNewUser}
          setUserInfo={handleSetUserInfo}
        />
      </div>
      <TablesContainer
        handleRowEdit={handleRowEdit}
        handleRowDelete={handleRowDelete}
        handleTableRemove={handleTableRemove}
        handleTableCopy={handleTableCopy}
        tables={tables}
      />
      <main>
        {isModalOpen &&
          <Modal toggleModal={toggleModal} modalData={curRow}>
            <form onSubmit={handleOnSave} className={styles['modal-form']}>
              <div className={styles['modal-form__header']}>
                <input onChange={onFieldChange} name="name" value={curRow.name} className={getFormInputClassNames(name)} placeholder="Name"/>
                <input onChange={onFieldChange} name="surname" value={curRow.surname} className={getFormInputClassNames(surname)} placeholder="Surname"/>
                <input onChange={onFieldChange} name="city" value={curRow.city} className={getFormInputClassNames(city)} placeholder="City"/>
              </div>
              <div className={styles['modal-form__footer']}>
                <div className={styles['modal-form__footer-left']}>
                  <input onChange={onToggleAgree} className={styles['modal-form__checkbox']} type="checkbox"/>
                  <label className={styles['modal-form__label']}>Totally agree</label>
                </div>
                <button className={styles['modal-form__save-btn']} disabled={!isAgreed}>SAVE</button>
              </div>
            </form>
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;
