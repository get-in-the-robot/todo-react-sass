import { useState } from 'react';
import Button from '../UI/Button';
import Settings from './Settings/Settings';
import HeaderForm from './HeaderForm';
import { Gear as IconGear } from 'phosphor-react';
import styles from './Header.module.scss';

const Header = () => {
  const [modal, setModal] = useState(false);

  const modalHandler = () => setModal((prevState) => !prevState);

  return (
    <header className={styles.header}>
      {modal && <Settings onClose={modalHandler} />}
      <div className={styles['header__title-section']}>
        <h1 className={styles.header__title}>TASKER</h1>
        <Button onClick={modalHandler}>
          <IconGear className={styles.header__settings} size={32} />
        </Button>
      </div>
      <HeaderForm />
    </header>
  );
};

export default Header;
