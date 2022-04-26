import { useContext, useEffect } from 'react';
import { TasksContext, FoldersContext, SettingsContext } from './Contexts';

const LocalStorage = () => {
  const ctxTasks = useContext(TasksContext);
  const ctxFolders = useContext(FoldersContext);
  const ctxSettings = useContext(SettingsContext);

  const setTasksLS = () => {
    if (ctxTasks.tasks.length)
      localStorage.setItem('tasks', JSON.stringify(ctxTasks.tasks));
  };

  const setFoldersLS = () => {
    if (ctxFolders.folders.length)
      localStorage.setItem('folders', JSON.stringify(ctxFolders.folders));
  };

  const setSettingsLS = () => {
    localStorage.setItem('settings', JSON.stringify(ctxSettings));
  };

  const getTasksLS = () => {
    const tasksLS = JSON.parse(localStorage.getItem('tasks'));
    const foldersLS = JSON.parse(localStorage.getItem('folders'));
    const settignsLS = JSON.parse(localStorage.getItem('settings'));
    tasksLS && ctxTasks.updateAll(tasksLS);
    foldersLS && ctxFolders.updateAll(foldersLS);
    settignsLS && ctxSettings.updateAll(settignsLS);
  };

  useEffect(getTasksLS, []);
  useEffect(setTasksLS, [ctxTasks.tasks]);
  useEffect(setFoldersLS, [ctxFolders.folders]);
  // useEffect(setSettingsLS, [ctxSettings]);

  return <></>;
};

export default LocalStorage;
