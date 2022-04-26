import { useContext } from 'react';
import { FoldersContext } from '../../../store/Contexts';
import Folder from './Folder';
import styles from './FolderList.module.scss';

const FolderList = () => {
  const ctxFolders = useContext(FoldersContext);

  const folderSelectHandler = (event) =>
    ctxFolders.setCurrent(event.target.dataset.id);

  return (
    <ul className={styles['folder-menu__folders-list']}>
      {ctxFolders.folders.map((folder) => (
        <Folder
          onClick={folderSelectHandler}
          folder={folder}
          selectedFolder={ctxFolders.current}
          key={folder.id}
          data-id={folder.id}
        />
      ))}
    </ul>
  );
};

export default FolderList;
