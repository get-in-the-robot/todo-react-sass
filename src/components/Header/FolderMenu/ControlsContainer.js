import Button from '../../UI/Button';
import { Folder as IconFolder, X as IconX } from 'phosphor-react';
import styles from './ControlsContainer.module.scss';

const ControlsContainer = ({ onCloseMenu, onNewFolder }) => {
  return (
    <div className={styles['folder-menu__controls-container']}>
      <Button
        onClick={onNewFolder}
        className={styles['folder-menu__control-btn']}
      >
        <IconFolder weight="light" size={24} />
        <span>New folder</span>
      </Button>

      <Button
        onClick={onCloseMenu}
        className={styles['folder-menu__control-btn']}
      >
        <IconX weight="light" size={24} />
      </Button>
    </div>
  );
};

export default ControlsContainer;
