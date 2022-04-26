import styles from './Card.module.scss';

const Card = ({ className, children, onClick }) => {
  const classes = `${styles.card} ${className ? className : ''}`;

  return (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );
};

export default Card;
