import styles from "./iconButton.module.css";

export const IconButton = ({ children, ...rest }) => {
  return (
    <button {...rest} className={styles.btn}>
      {children}
    </button>
  );
};
