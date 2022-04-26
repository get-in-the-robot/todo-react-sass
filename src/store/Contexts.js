import { createContext } from 'react';

export const TasksContext = createContext({
  tasks: [],
  add: () => {},
  remove: () => {},
  sort: () => {},
  complete: () => {},
  noteUpdate: () => {},
  move: () => {},
  moveToDefault: () => {},
  updateAll: () => {},
  updateFiltered: () => {},
  validate: () => {},
});

export const FoldersContext = createContext({
  folders: [],
  current: '0',
  add: () => {},
  remove: () => {},
  rename: () => {},
  setCurrent: () => {},
  updateAll: () => {},
});

export const SettingsContext = createContext({
  pagination: false,
  itemsPerPage: 3,
  moveComplete: false,
  separateComplete: false,
  dispatch: () => {},
  updateAll: () => {},
});
