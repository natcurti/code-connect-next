import Image from "next/image";
import styles from "./avatar.module.css";

export const Avatar = ({ name, imgSrc }) => {
  return (
    <ul className={styles.avatar}>
      <li>
        <Image
          src={imgSrc}
          width={32}
          height={32}
          alt={`Avatar do usuário ${name}`}
        />
      </li>
      <li>@{name}</li>
    </ul>
  );
};
