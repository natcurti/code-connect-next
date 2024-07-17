import { CardPost } from "@/components/CardPost";
import { logger } from "@/logger";
import styles from "./page.module.css";
import Link from "next/link";
import db from "../../prisma/db";

const getAllPosts = async (page, search) => {
  try {
    const where = {};

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const perPage = 6;
    const skip = (page - 1) * perPage;

    const totalItems = await db.post.count({ where });
    const totalPages = Math.ceil(totalItems / perPage);

    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where,
      orderBy: {
        id: "desc",
      },
      include: {
        author: true,
      },
    });
    return { data: posts, prev, next };
  } catch (error) {
    logger.error("Falha ao obter posts", {
      error,
    });
    return { data: [], prev: null, next: null };
  }
};

export default async function Home({ searchParams }) {
  const currentPage = Number(searchParams?.page || 1);

  const search = searchParams?.q;

  const { data: posts, prev, next } = await getAllPosts(currentPage, search);
  return (
    <main>
      <div className={styles["card-container"]}>
        {posts.map((post) => (
          <CardPost post={post} key={post.id} />
        ))}
      </div>
      <div className={styles["link-container"]}>
        {prev && (
          <Link
            href={{ pathname: "/", query: { page: prev, q: search } }}
            className={styles.link}
          >
            Página Anterior
          </Link>
        )}
        {next && (
          <Link
            href={{ pathname: "/", query: { page: next, q: search } }}
            className={styles.link}
          >
            Próxima Página
          </Link>
        )}
      </div>
    </main>
  );
}
