import { CardPost } from "@/components/CardPost";
import { logger } from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

const getAllPosts = async (page) => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
      },
    });
    return { data: posts, prev: null, next: null };
  } catch (error) {
    logger.error("Falha ao obter posts", {
      error,
    });
    return { data: [], prev: null, next: null };
  }
};

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  const { data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <main>
      <div className={styles["card-container"]}>
        {posts.map((post) => (
          <CardPost post={post} key={post.id} />
        ))}
      </div>
      <div className={styles["link-container"]}>
        {prev && (
          <Link href={`/?page=${prev}`} className={styles.link}>
            Página Anterior
          </Link>
        )}
        {next && (
          <Link href={`/?page=${next}`} className={styles.link}>
            Próxima Página
          </Link>
        )}
      </div>
    </main>
  );
}
