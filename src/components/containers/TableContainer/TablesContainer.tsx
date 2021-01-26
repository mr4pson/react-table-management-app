import Table from '../../UI/Table';
import { TypeTable } from '../../UI/Table/type';
import styles from './TablesContainer.module.scss';

type IProps = {
  handleRowDelete: (table: TypeTable) => void,
  handleRowEdit: (table: TypeTable, index: number) => void,
  handleTableRemove: (table: TypeTable) => void,
  handleTableCopy: (table: TypeTable) => void,
  tables: TypeTable[],
}

const TablesContainer = (props: IProps) => {
  const checkIfRemoveBtnShown = (): boolean => {
    return props.tables.length > 1;
  }
  return (
    <div className={styles['table-container']}>
      {props.tables.length === 0 ? 'No data' : props.tables.map((table) => (
        <Table
          key={table.id}
          data={table}
          isRemoveBtnShown={checkIfRemoveBtnShown()}
          handleRowEdit={props.handleRowEdit}
          handleRowDelete={props.handleRowDelete}
          handleTableRemove={props.handleTableRemove}
          handleTableCopy={props.handleTableCopy}
        />
      ))}
    </div>
  )
}

export default TablesContainer;