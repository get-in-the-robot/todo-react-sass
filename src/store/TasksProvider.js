import React, { useState } from 'react';
import { TasksContext } from './Contexts';

const sorter = (arr, sort) => {
  return [
    ...arr.sort((a, b) => {
      let task1, task2;

      if (sort === 'alph_asc' || sort === 'alph_desc') {
        task1 = a.name.toLowerCase();
        task2 = b.name.toLowerCase();
      }

      if (sort === 'date_asc' || sort === 'date_desc') {
        task1 = a.date;
        task2 = b.date;
      }

      if (sort === 'alph_asc' || sort === 'date_asc')
        return task1 < task2 ? -1 : task1 > task2 ? 1 : 0;
      if (sort === 'alph_desc' || sort === 'date_desc')
        return task1 > task2 ? -1 : task1 < task2 ? 1 : 0;
    }),
  ];
};

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const taskSubmitHandler = (task) =>
    setTasks((prevState) => [task, ...prevState]);

  const taskDeleteHandler = (id) =>
    setTasks((prevState) => prevState.filter((task) => task.id !== id));

  const taskCompleteHandler = (id) =>
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) task.complete = !task.complete;
        return task;
      })
    );

  const taskNoteUpdateHandler = (id, note) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) task.note = note;
        return task;
      })
    );
  };

  const sortHandler = (sort) =>
    setFilteredTasks((prevState) => {
      return sorter(prevState, sort);
    });

  const taskMoveHandler = (taskID, folderID) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === taskID) task.folder = folderID;
        return task;
      })
    );
  };

  const taskMoveDefaultHandler = (id) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.folder === id) task.folder = '0';
        return task;
      })
    );
  };

  const updateHandler = (data) => setTasks(data);
  const updateFilteredHandler = (data) => setFilteredTasks(data);

  const validationHandler = (task) => (task.length ? true : false);

  const tasksContext = {
    tasks: tasks,
    filtered: filteredTasks,
    add: taskSubmitHandler,
    remove: taskDeleteHandler,
    sort: sortHandler,
    complete: taskCompleteHandler,
    noteUpdate: taskNoteUpdateHandler,
    move: taskMoveHandler,
    moveToDefault: taskMoveDefaultHandler,
    updateAll: updateHandler,
    updateFiltered: updateFilteredHandler,
    validate: validationHandler,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
