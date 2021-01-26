import classNames from 'classnames';
import styles from './Table.module.scss';
import { TypeTableButton, TypeRowButton, TypeTable } from './type';

type IProps = {
  data: TypeTable,
  isRemoveBtnShown: boolean,
  handleRowDelete: (table: TypeTable) => void,
  handleRowEdit: (table: TypeTable, index: number) => void,
  handleTableRemove: (table: TypeTable) => void,
  handleTableCopy: (table: TypeTable) => void,
}

const COPY_TABLE = 'Copy table';

const Table = (props: IProps) => {
  const getRowButtonClassNames = (type: TypeRowButton) => {
    return classNames(styles['row__button'], {
      [styles['row__button_edit']]: type === TypeRowButton.Edit,
      [styles['row__button_delete']]: type === TypeRowButton.Delete,
    });
  }
  const getTableButtonClassNames = (type: TypeTableButton) => {
    return classNames(styles['table__button'], {
      [styles['table__button_copy']]: type === TypeTableButton.Copy,
      [styles['table__button_remove']]: type === TypeTableButton.Remove,
    });
  }
  const handleRowEdit = (index: number) => {
    props.handleRowEdit(props.data, index);
  }
  const handleRowDelete = (index: number) => {
    const table = {...props.data};
    table.rows.splice(index, 1);
    props.handleRowDelete(table);
  }
  const handleTableRemove = (table: TypeTable) => {
    props.handleTableRemove(table);
  }
  const handleTableCopy = (table: TypeTable) => {
    props.handleTableCopy(table);
  }
  return (
    <>
      <div className={styles['table']}>
        <div className={styles['table__actions']}>
          <button onClick={handleTableCopy.bind(Table, props.data)} className={getTableButtonClassNames(TypeTableButton.Copy)}>{COPY_TABLE}</button>
          {props.isRemoveBtnShown ? <button
            onClick={handleTableRemove.bind(Table, props.data)}
            className={getTableButtonClassNames(TypeTableButton.Remove)}
          ></button> : ''}
        </div>
        {props.data.rows.length > 0 ? 
          <table className={styles['table__body']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.data?.rows.map((row, index) => (
                <tr className={styles['row']} key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.surname}</td>
                  <td>{row.age}</td>
                  <td>{row.city}</td>
                  <td >
                    <div className={styles['row__actions']}>
                      <button onClick={handleRowEdit.bind(Table, index)} className={getRowButtonClassNames(TypeRowButton.Edit)}>Edit</button>
                      <button onClick={handleRowDelete.bind(Table, index)} className={getRowButtonClassNames(TypeRowButton.Delete)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        : 'The table is empty'}
      </div>
    </>
  )
}

export default Table;