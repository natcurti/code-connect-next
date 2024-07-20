"use client";

import { useRef } from "react";
import { Modal } from "../Modal";

import styles from "./modalReply.module.css";
import { SubmitButton } from "../SubmitButton";
import { Comment } from "../Comment";
import { postReply } from "@/actions";
import { Textarea } from "../Textarea";

export const ReplyModal = ({ comment }) => {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.openModal();
  };

  const action = postReply.bind(null, comment);

  return (
    <>
      <Modal ref={modalRef}>
        <form action={action}>
          <div className={styles.body}>
            <Comment comment={comment} />
          </div>
          <div className={styles.divider}></div>
          <Textarea name="text" placeholder="Digite aqui..." />
          <div className={styles.footer}>
            <SubmitButton>Responder</SubmitButton>
          </div>
        </form>
      </Modal>
      <button className={styles.btn} onClick={openModal}>
        Responder
      </button>
    </>
  );
};
