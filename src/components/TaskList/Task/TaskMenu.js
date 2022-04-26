import { useContext } from 'react';
import { TasksContext } from '../../../store/Contexts';
import Button from '../../../components/UI/Button';
import {
  Check as IconCheck,
  ArrowsClockwise as IconArrowsClockwise,
  Pencil as IconPencil,
  Trash as IconTrash,
} from 'phosphor-react';
import styles from './TaskMenu.module.scss';

const TaskMenu = ({ task, onEdit, className }) => {
  const ctxTasks = useContext(TasksContext);

  const completeHandler = (event) => {
    event.stopPropagation();
    ctxTasks.complete(task.id);
  };

  const deleteHandler = (event) => {
    event.stopPropagation();
    ctxTasks.remove(task.id);
  };

  return (
    <ul className={className}>
      <li>
        <Button onClick={completeHandler} className={styles.task__btn}>
          {task.complete ? (
            <IconArrowsClockwise size={28} weight="light" />
          ) : (
            <IconCheck size={28} weight="light" />
          )}
        </Button>
      </li>
      <li>
        <Button onClick={onEdit} className={styles.task__btn}>
          <IconPencil size={28} weight="light" />
        </Button>
      </li>
      <li>
        <Button onClick={deleteHandler} className={styles.task__btn}>
          <IconTrash size={28} weight="light" />
        </Button>
      </li>
    </ul>
  );
};

export default TaskMenu;
