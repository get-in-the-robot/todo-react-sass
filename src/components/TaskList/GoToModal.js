import Card from '../UI/Card';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import styles from './GoToModal.module.scss';
import Overlay from '../UI/Overlay';
import { useState } from 'react';

const GoToModal = ({ onClose, onPageChange }) => {
  const [page, setPage] = useState(null);
  const propagationHandler = (event) => event.stopPropagation();

  const pageChangeHandler = () => {
    if (!page) return;
    onPageChange(page);
  };

  return (
    <Overlay onClick={onClose}>
      <Card onClick={propagationHandler} className={styles.goto}>
        <TextInput
          className={styles.goto__input}
          type="numbers"
          placeholder="Page"
          onChange={(event) => setPage(+event.target.value)}
        />
        <Button onClick={pageChangeHandler} className={styles.goto__btn}>
          <span>Go to page</span>
        </Button>
      </Card>
    </Overlay>
  );
};

export default GoToModal;
