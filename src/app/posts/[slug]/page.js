import { logger } from "@/logger";
import { remark } from "remark";
import html from "remark-html";
import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";

const getPostBySlug = async (slug) => {
  const postDetails = await fetch(`http://localhost:3042/posts?slug=${slug}`);

  if (!postDetails.ok) {
    logger.error("Erro na requisição dos detalhes do post");
    return [];
  }
  logger.info("Post obtidos com sucesso");

  const data = await postDetails.json();
  if (data.length == 0) {
    return {};
  }

  const post = data[0];

  const processedContent = await remark().use(html).process(post.markdown);
  const contentHtml = processedContent.toString();

  post.markdown = contentHtml;

  return post;
};

const PostDetailsPage = async ({ params }) => {
  const postToShow = await getPostBySlug(params.slug);

  return (
    <div>
      <CardPost post={postToShow} highlight />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code}>
        <div dangerouslySetInnerHTML={{ __html: postToShow.markdown }} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
