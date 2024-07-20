import styles from "./textarea.module.css";

export const Textarea = ({ name, placeholder }) => {
  return (
    <textarea
      name={name}
      required
      placeholder={placeholder}
      className={styles.textArea}
    />
  );
};
