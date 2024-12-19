import { StrapiImage } from "./strapi-image";

export interface ArticleCardProps {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  cover: {
    url: string;
    alternativeText: string;
  };
}

export function ArticleCard({
  title,
  description,
  publishedAt,
  slug,
  cover,
}: Readonly<ArticleCardProps>) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <StrapiImage
          src={cover.url}
          alt={cover.alternativeText}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
