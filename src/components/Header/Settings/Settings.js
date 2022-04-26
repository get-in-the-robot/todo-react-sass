import ReactDOM from 'react-dom';
import { X as IconX } from 'phosphor-react';
import Overlay from '../../UI/Overlay';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import SettingsForm from './SettingsForm';
import styles from './Settings.module.scss';

const Settings = ({ onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay onClick={onClose} className={styles['settings__overlay']} />,
        document.querySelector('#overlay')
      )}
      <Card className={styles['settings__card']}>
        <div className={styles['settings__heading']}>
          <h2>Settings</h2>
          <Button className={styles['settings__close']} onClick={onClose}>
            <IconX color="#fff" size={28} />
          </Button>
        </div>
        <SettingsForm />
      </Card>
    </>
  );
};

export default Settings;
