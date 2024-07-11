import Image from "next/image";
import styles from "./aside.module.css";
import logo from "./logo-code-connect.png";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Image src={logo} alt="Logo Connect" />
    </aside>
  );
};
