import qs from "qs";

import type { Route } from "./+types/_index";
import { ArticleCard } from "../components/article-card";

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
  };
}

interface ArticleResponse {
  data: Article[];
}

interface LoaderData {
  articlesData: ArticleResponse;
}

// Server Side Loader
export async function loader({ params }: Route.LoaderArgs) {
  const BASE_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
  const path = "/api/articles";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      cover: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  const articlesData = await fetch(url.href);
  const data = await articlesData.json();
  return { articlesData: data as ArticleResponse };
}

export function meta(/*{}: Route.MetaArgs */) {
  return [
    { title: "Home | React Router 7" },
    { name: "description", content: "Home Page" },
  ];
}

export default function IndexRoute({ loaderData }: { loaderData: LoaderData }) {
  if (!loaderData) return <p>No data found</p>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        React Router 7 and Strapi 5 Demo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderData.articlesData.data.map((article: Article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            publishedAt={article.publishedAt}
            slug={article.slug}
            cover={article.cover}
          />
        ))}
      </div>
    </div>
  );
}
