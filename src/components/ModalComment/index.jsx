"use client";
import { useRef } from "react";
import { IconButton } from "../IconButton";
import { Chat } from "../Icons/Chat";
import { Modal } from "../Modal";
import styles from "./modalComment.module.css";
import { SubmitButton } from "../SubmitButton";

export const ModalComment = ({ action }) => {
  const modalRef = useRef(null);

  return (
    <>
      <Modal ref={modalRef}>
        <h1 className={styles.title}>Deixe seu comentário sobre o post</h1>
        <form
          className={styles.form}
          action={action}
          onSubmit={() => modalRef.current.closeModal()}
        >
          <textarea
            name="text"
            className={styles.textArea}
            placeholder="Digite o seu comentário"
          />
          <SubmitButton>Comentar</SubmitButton>
        </form>
      </Modal>
      <IconButton onClick={() => modalRef.current.openModal()}>
        <Chat />
      </IconButton>
    </>
  );
};
