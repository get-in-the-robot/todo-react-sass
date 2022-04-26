import styles from './Overlay.module.scss';

const Overlay = ({ children, onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default Overlay;
