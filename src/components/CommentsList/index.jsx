import { Comment } from "../Comment";
import { ReplyModal } from "../ModalReply";
import { Replies } from "../Replies";
import styles from "./commentsList.module.css";

export const CommentsList = ({ comments }) => {
  return (
    <section className={styles.comments}>
      <h2>Comentários</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
            <ReplyModal comment={comment} />
            <Replies comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  );
};
