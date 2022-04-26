import { useState } from 'react';
import TaskMenu from './TaskMenu';
import TaskEditor from './TaskEditor';
import TextEditor from '../TextEditor/TextEditor';
import styles from './Task.module.scss';

const dateFormat = (dateData) => {
  const now = Date.now();
  const date = dateData;
  const daysPased = Math.round((now - date) / 1000 / 60 / 60 / 24);
  const locale = window.navigator.language;

  if (!daysPased) return 'Today';
  if (daysPased === 1) return 'Yesterday';
  if (daysPased < 3) return `${daysPased} days ago`;
  if (daysPased < 8) return `This week`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const Task = ({ task, className }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showFullTask, setShowFullTask] = useState(false);

  const classes = `${styles.task__container} 
  ${task.complete ? styles['task__container--complete'] : ''} 
  ${showEditor ? styles['task__container--edit'] : ''} 
  ${showFullTask && task.note ? styles['task__container--active'] : ''}`;

  const showFullHandler = () => {
    if (showEditor) return;
    setShowFullTask((prevState) => !prevState);
  };

  const editHandler = (event) => {
    event.stopPropagation();
    setShowFullTask(false);
    setShowEditor((prevState) => !prevState);
  };

  return (
    <>
      <li
        onClick={showFullHandler}
        className={`${styles.task} ${className ? className : ''}`}
      >
        <div className={classes}>
          <div className={styles['task__main-container']}>
            <span className={styles.task__title}>{task.name}</span>
            <TaskMenu
              task={task}
              onEdit={editHandler}
              className={styles.task__menu}
            />
          </div>
          <div className={styles['task__date-container']}>
            <time className={styles.task__date}>{dateFormat(task.date)}</time>
          </div>
        </div>
        {showEditor && <TaskEditor task={task} />}
        {showFullTask && task.note && (
          <TextEditor task={task} readOnly={true} />
        )}
      </li>
    </>
  );
};

export default Task;
