import { CardPost } from "@/components/CardPost";
import { logger } from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";

const getAllPosts = async (page) => {
  const allPosts = await fetch(
    `http://localhost:3042/posts?_page=${page}&_per_page=6`
  );
  if (!allPosts.ok) {
    logger.error("Erro na requisição dos posts");
    return [];
  }
  logger.info("Posts obtidos com sucesso");
  return allPosts.json();
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
