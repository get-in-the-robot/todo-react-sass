import { useContext } from 'react';
import { FoldersContext } from '../../../store/Contexts';
import Button from '../../UI/Button';
import {
  TrashSimple as IconTrashSimple,
  PencilSimple as IconPencilSimple,
} from 'phosphor-react';

const FolderEdit = ({ className }) => {
  const ctxFolders = useContext(FoldersContext);

  const folderDeleteHandler = (event) => {
    event.stopPropagation();

    const folder = event.target.closest('li');
    ctxFolders.remove(folder.dataset.id);
  };

  return (
    <div className={className}>
      <Button onClick={folderDeleteHandler}>
        <IconTrashSimple weight="light" size={16} />
      </Button>
      <Button>
        <IconPencilSimple weight="light" size={16} />
      </Button>
    </div>
  );
};

export default FolderEdit;
