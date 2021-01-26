import classNames from 'classnames';
import { Portal } from 'react-portal';
import { TypeUserInfo } from '../Form/type';
import styles from './Modal.module.scss';

type IProps = {
  modalData: TypeUserInfo,
  children: React.ReactNode,
  toggleModal: () => void,
}

const Modal = (props: IProps) => {
  const getHeaderClassNames = () => {
    return classNames(styles['modal__header'], styles['header']);
  }
  return (
    <Portal>
      <div className={styles['modal']}>
        <div className={getHeaderClassNames()}>
          <div className={styles['header__title']}>{props.modalData?.name + ' ' + props.modalData?.surname}</div>
          <div onClick={props.toggleModal} className={styles['header__close-btn']}></div>
        </div>
        <div className={styles['modal__body']}>
          {props.children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal;