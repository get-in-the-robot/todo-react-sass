import { useContext, useEffect } from 'react';
import { TasksContext, FoldersContext } from '../../store/Contexts';

const FolderFilter = ({ className }) => {
  const ctxTasks = useContext(TasksContext);
  const ctxFolders = useContext(FoldersContext);

  // Set the current folder in Folders Context to the selected option
  const folderChangeHandler = (event) => {
    if (ctxFolders.current === event.target.value) return;
    ctxFolders.setCurrent(event.target.value);
  };

  // Filter tasks using the current folder ID
  const folderFilter = (folderID) => {
    const filteredTasks = ctxTasks.tasks.filter(
      (task) => task.folder === folderID
    );

    // Save changes to filtered tasks in Tasks Context
    ctxTasks.updateFiltered(filteredTasks);
  };

  // If tasks array or current folder updated, filter tasks
  useEffect(
    () => folderFilter(ctxFolders.current),
    [ctxTasks.tasks, ctxFolders.current]
  );

  return (
    <select
      defaultValue={ctxFolders.current}
      onChange={folderChangeHandler}
      className={className}
    >
      {ctxFolders.folders.map((folder) => (
        <option
          // selected={ctxFolders.current === folder.id && 'selected'}
          key={folder.id}
          value={folder.id}
        >
          {folder.name}
        </option>
      ))}
    </select>
  );
};

export default FolderFilter;
