import { v4 as uuidv4 } from 'uuid';
import { useState, useContext } from 'react';
import { FoldersContext, TasksContext } from '../../store/Contexts';
import Container from '../UI/Container';
import Card from '../UI/Card';
import NewTaskInput from './NewTaskInput';
import Button from '../UI/Button';
import styles from './HeaderForm.module.scss';

const HeaderForm = () => {
  const [taskNameInput, setTaskNameInput] = useState('');
  const [taskInputTouched, setTaskInputTouched] = useState(false);
  const ctxTasks = useContext(TasksContext);
  const ctxFolders = useContext(FoldersContext);

  const validTaskName = taskNameInput.trim().length;
  const formInvalid = !validTaskName && taskInputTouched;

  const submitBtnClasses = formInvalid
    ? styles['header__submit-btn--disabled']
    : styles['header__submit-btn'];

  const newTaskNameHandler = (event) => {
    setTaskNameInput(event.target.value);
    setTaskInputTouched(true);
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    setTaskInputTouched(true);
    if (!validTaskName) return;

    const newTask = {
      id: uuidv4(),
      name: taskNameInput.trim(),
      note: null,
      folder: ctxFolders.current,
      date: Date.now(),
      complete: false,
    };

    ctxTasks.add(newTask);
    setTaskInputTouched(false);
    setTaskNameInput('');
  };

  return (
    <Container>
      <Card>
        <form onSubmit={addNewTaskHandler} className={styles.header__form}>
          <NewTaskInput
            onTaskInputChange={newTaskNameHandler}
            value={taskNameInput}
            invalid={formInvalid}
          />
          <Button type="submit" className={submitBtnClasses}>
            <span>Add task</span>
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default HeaderForm;
