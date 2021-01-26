import { TypeUserInfo } from '../../UI/Form/type';
import styles from './TablesContainer.module.scss';

type IProps = {
  users: TypeUserInfo[],
}

const TablesContainer = (props: IProps) => {
  return (
    <div className={styles['table-container']}>
      {props.users.map((user) => (<div key={user.id}>{user.name}</div>))}
    </div>
  )
}

export default TablesContainer;