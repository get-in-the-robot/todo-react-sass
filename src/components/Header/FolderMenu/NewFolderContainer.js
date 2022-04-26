import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import { FoldersContext } from '../../../store/Contexts';
import Button from '../../UI/Button';
import TextInput from '../../UI/TextInput';
import styles from './NewFolderContainer.module.scss';

const NewFolderContainer = () => {
  const [newFolderName, setNewFolderName] = useState('');
  const ctxFolders = useContext(FoldersContext);

  const newFolderNameHandler = (event) => {
    setNewFolderName(event.target.value);
  };

  const addNewFolderHandler = () => {
    if (!newFolderName.trim().length) return;

    const newFolder = {
      name: newFolderName.trim(),
      id: uuidv4(),
    };

    ctxFolders.add(newFolder);
    setNewFolderName('');
  };

  return (
    <div className={styles['folder-menu__new-folder-container']}>
      <TextInput
        onChange={newFolderNameHandler}
        value={newFolderName}
        className={styles['folder-menu__input']}
        placeholder="Folder name"
      />
      <Button
        onClick={addNewFolderHandler}
        className={styles['folder-menu__submit-btn']}
      >
        <span>Add</span>
      </Button>
    </div>
  );
};

export default NewFolderContainer;
