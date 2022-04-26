import { useState, useContext, useEffect } from 'react';
import { SettingsContext, TasksContext } from '../../store/Contexts';
import Container from '../UI/Container';
import Card from '../UI/Card';
import Task from './Task/Task';
import Pagination from './Pagination';
import styles from './TaskList.module.scss';

const TaskList = ({ search }) => {
  const ctxTasks = useContext(TasksContext);
  const ctxSettings = useContext(SettingsContext);

  // Tasks filtered by folder
  const [currentTasks, setCurrentTasks] = useState(ctxTasks.filtered);

  // Tasks filtered by current page
  const [pagination, setPagination] = useState(true);
  const [currentPageTasks, setCurrentPageTasks] = useState([]);

  // Check if pagination is enabled
  useEffect(
    () => setPagination(ctxSettings.pagination),
    [ctxSettings.pagination]
  );

  // Get folder filtered tasks from the context
  useEffect(() => setCurrentTasks(ctxTasks.filtered), [ctxTasks.filtered]);

  // Decide what tasks will be rendered
  // The whole list or page specific
  const renderTasks = pagination ? currentPageTasks : currentTasks;

  // Check if task should be rendered depending on the search string
  // If not, the hidden CSS class will be used on it
  const taskComponent = (task) => {
    const classes = task.name.toLowerCase().includes(search) ? '' : 'hidden';
    return <Task task={task} key={task.id} className={classes} />;
  };

  // Update current page tasks on page change
  const pageChangeHandler = (tasks) => setCurrentPageTasks(tasks);

  return (
    <>
      <main className={styles['task-list']}>
        <Container>
          <Card>
            {!renderTasks.length ? (
              <p className={styles['task-list__empty']}>No tasks found v_v</p>
            ) : (
              <ul className={styles['task-list__container']}>
                {renderTasks.map((task) => taskComponent(task))}
              </ul>
            )}
          </Card>
        </Container>
      </main>

      {pagination && (
        <Pagination tasks={currentTasks} onPageChange={pageChangeHandler} />
      )}
    </>
  );
};

export default TaskList;
