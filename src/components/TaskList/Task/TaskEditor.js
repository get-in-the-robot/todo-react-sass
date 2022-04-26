import { useContext, useState } from 'react';
import { TasksContext } from '../../../store/Contexts';
import Button from '../../UI/Button';
import TextInput from '../../UI/TextInput';
import TextEditor from '../TextEditor/TextEditor';
import { NotePencil as IconNotePencil, Note as IconNote } from 'phosphor-react';
import styles from './TaskEditor.module.scss';

const TaskEditor = ({ task }) => {
  const [title, setTitle] = useState(task.name);
  const [note, setNote] = useState('');

  const titleHandler = (event) => setTitle(event.target.value);
  const noteHandler = (noteState) => setNote(noteState);

  const ctxTasks = useContext(TasksContext);

  const saveHandler = () => {
    const tasks = ctxTasks.tasks.map((item) => {
      if (item.id === task.id) {
        item.name = title;
        item.note = note;
      }
      return item;
    });
    ctxTasks.updateAll(tasks);
  };

  return (
    <div className={styles.task__editor}>
      <div className={styles['task__title-edit-container']}>
        <div className={styles['task__icon-container']}>
          <IconNotePencil size={28} />
        </div>
        <TextInput
          className={styles['task__title-edit']}
          onChange={titleHandler}
          value={title}
        />
      </div>
      <div className={styles['task__note-edit-container']}>
        <div className={styles['task__icon-container']}>
          <IconNote size={28} />
        </div>
        <TextEditor onSave={noteHandler} task={task} />
      </div>
      <Button onClick={saveHandler} className={styles['task__save-edit-btn']}>
        <span>Save</span>
      </Button>
    </div>
  );
};

export default TaskEditor;
