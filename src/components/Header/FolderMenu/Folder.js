import FolderEdit from './FolderEdit';
import styles from './Folder.module.scss';

const Folder = ({ onClick, folder, selectedFolder }) => {
  const classes = `${styles['folder-menu__folder']} ${
    selectedFolder === folder.id ? styles['folder-menu__folder--active'] : ''
  }`;

  return (
    <li
      onClick={onClick}
      className={classes}
      key={folder.id}
      data-id={folder.id}
    >
      <span>{folder.name}</span>
      <FolderEdit className={styles['folder-menu__edit-menu']} />
    </li>
  );
};

export default Folder;
