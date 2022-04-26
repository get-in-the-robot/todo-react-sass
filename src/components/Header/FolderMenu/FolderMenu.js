import { useState } from 'react';
import Card from '../../UI/Card';
import ControlsContainer from './ControlsContainer';
import NewFolderContainer from './NewFolderContainer';
import FolderList from './FolderList';
import styles from './FolderMenu.module.scss';

const HeaderFolderMenu = ({ onCloseMenu }) => {
  const [newFolderMenuOpen, setNewFolderMenuOpen] = useState(false);

  const newFolderMenuHandler = () =>
    setNewFolderMenuOpen((prevState) => !prevState);

  return (
    <Card className={styles['folder-menu']}>
      <ControlsContainer
        onCloseMenu={onCloseMenu}
        onNewFolder={newFolderMenuHandler}
      />
      {newFolderMenuOpen && <NewFolderContainer />}
      <FolderList />
    </Card>
  );
};

export default HeaderFolderMenu;
