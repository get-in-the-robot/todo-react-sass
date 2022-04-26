import styles from './Container.module.scss';

const Container = ({ className, children }) => {
  const classes = `${styles.container} ${className ? className : ''}`;

  return <div className={classes}>{children}</div>;
};

export default Container;
