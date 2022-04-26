import { useState } from 'react';
import FolderMenu from './FolderMenu/FolderMenu';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import styles from './NewTaskInput.module.scss';

const NewTaskInput = ({ value, invalid, onTaskInputChange }) => {
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);

  const taskInputPlaceholder = invalid ? `Can't be blank` : 'Start typing...';
  const taskInputClasses = invalid
    ? styles['header__input--invalid']
    : styles['header__input'];
  const folderBtnClasses = invalid
    ? styles['header__folder-btn--inactive']
    : styles['header__folder-btn'];

  const folderMenuHandler = () => setFolderMenuOpen((prevState) => !prevState);

  return (
    <div className={styles['header__input-container']}>
      {folderMenuOpen && <FolderMenu onCloseMenu={folderMenuHandler} />}

      <TextInput
        onChange={onTaskInputChange}
        value={value}
        placeholder={taskInputPlaceholder}
        className={taskInputClasses}
      />
      <Button onClick={folderMenuHandler} className={folderBtnClasses}>
        <span>Folder</span>
      </Button>
    </div>
  );
};

export default NewTaskInput;
