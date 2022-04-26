import { useContext } from 'react';
import { SettingsContext } from '../../../store/Contexts';
import styles from './SettingsForm.module.scss';

const OPTIONS = [
  { type: 'checkbox', id: 'pagination', label: 'Enable pagination' },
  { type: 'numbers', id: 'itemsPerPage', label: 'Tasks per page' },
  // {
  //   type: 'checkbox',
  //   id: 'separateComplete',
  //   label: 'Separate list for complete tasks',
  // },
  // {
  //   type: 'checkbox',
  //   id: 'moveComplete',
  //   label: 'Complete tasks in the bottom',
  // },
];

const Option = ({ option, context, handler }) => {
  return (
    <li className={styles.settings__option}>
      <input
        className={
          option.type === 'checkbox'
            ? styles.settings__checkbox
            : styles.settings__text
        }
        id={option.id}
        type={option.type}
        onChange={handler}
        value={context[option.id]}
        checked={context[option.id]}
      />
      <label className={styles.settings__label} htmlFor={option.id}>
        <span>{option.label}</span>
      </label>
    </li>
  );
};

const SettingsForm = () => {
  const ctxSettings = useContext(SettingsContext);

  const settingChangeHandler = (event) => {
    const option = event.target;
    ctxSettings.dispatch({
      type: option.id,
      state: option.type === 'checkbox' ? option.checked : +option.value,
    });
  };

  return (
    <form>
      <ul className={styles['settings__form']}>
        {OPTIONS.map((option) => (
          <Option
            key={option.id}
            option={option}
            context={ctxSettings}
            handler={settingChangeHandler}
          />
        ))}
      </ul>
    </form>
  );
};

export default SettingsForm;
