import styles from './TextInput.module.scss';

const TextInput = ({
  className,
  type = 'text',
  placeholder,
  value,
  onChange,
}) => {
  const classes = `${styles.input} ${className ? className : ''}`;

  return (
    <input
      className={classes}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TextInput;
