import styles from './Button.module.scss';

const Button = ({ onClick, className, children, type = 'button' }) => {
  const classes = `${styles.btn} ${className ? className : ''}`;

  return (
    <button onClick={onClick} className={classes} type={type}>
      {children}
    </button>
  );
};

export default Button;
