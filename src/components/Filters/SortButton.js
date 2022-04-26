import { useContext, useEffect, useReducer } from 'react';
import { TasksContext } from '../../store/Contexts';
import Button from '../UI/Button';
import {
  SortAscending as IconSortAscending,
  SortDescending as IconSortDecending,
} from 'phosphor-react';

// Take a sorting method from a button prop and switch it on click
const sortReducer = (state, action) => {
  switch (action.type) {
    case 'alph_asc':
      return state === 'alph_asc' ? 'alph_desc' : 'alph_asc';
    case 'date_asc':
      return state === 'date_asc' ? 'date_desc' : 'date_asc';
    default:
      return;
  }
};

const SortButton = ({ className, children, sortMethod }) => {
  const [sort, sortDispatch] = useReducer(sortReducer, '');
  const ctxTasks = useContext(TasksContext);

  // Sort tasks based on the current sort method
  useEffect(() => ctxTasks.sort(sort), [sort]);

  return (
    <Button
      onClick={() => sortDispatch({ type: sortMethod })}
      className={className}
    >
      {children}
      {sort === sortMethod ? (
        <IconSortDecending size={24} weight="light" />
      ) : (
        <IconSortAscending size={24} weight="light" />
      )}
    </Button>
  );
};

export default SortButton;
