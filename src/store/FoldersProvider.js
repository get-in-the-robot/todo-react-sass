import React, { useContext, useState } from 'react';
import { FoldersContext, TasksContext } from './Contexts';

const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([{ name: 'Default', id: '0' }]);
  const [currentFolder, setCurrrentFolder] = useState('0');

  const ctxTasks = useContext(TasksContext);

  const addFolderHandler = (folder) =>
    setFolders((prevState) => [folder, ...prevState]);

  const removeFolderHandler = (id) => {
    ctxTasks.moveToDefault(id);
    setFolders((prevState) => prevState.filter((folder) => folder.id !== id));
  };

  const renameFolderHandler = (id, name) =>
    setFolders((prevState) =>
      prevState.map((folder) => {
        console.log(id);
        if (folder.id === id) folder.name = name;
        return folder;
      })
    );

  const currentFolderHandler = (id) => setCurrrentFolder(id);

  const updateFoldersHandler = (data) => setFolders(data);

  const foldersContext = {
    folders: folders,
    current: currentFolder,
    add: addFolderHandler,
    remove: removeFolderHandler,
    rename: renameFolderHandler,
    setCurrent: currentFolderHandler,
    updateAll: updateFoldersHandler,
  };

  return (
    <FoldersContext.Provider value={foldersContext}>
      {children}
    </FoldersContext.Provider>
  );
};

export default FolderProvider;
