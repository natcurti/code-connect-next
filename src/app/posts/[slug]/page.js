import { logger } from "@/logger";
import { remark } from "remark";
import html from "remark-html";
import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";
import { CommentsList } from "@/components/CommentsList";

const getPostBySlug = async (slug) => {
  try {
    const post = await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
          where: {
            parentId: null,
          },
        },
      },
    });

    if (!post) {
      throw new Error(`Post com o slug ${slug} não foi encontrado`);
    }

    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error) {
    logger.error("Falha ao obter o post com o slug", {
      slug,
      error,
    });
  }
  redirect("/not-found");
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
      <CommentsList comments={postToShow.comments} />
    </div>
  );
};

export default PostDetailsPage;
