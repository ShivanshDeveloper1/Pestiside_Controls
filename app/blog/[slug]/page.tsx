import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/blog/ArticlePage";
import { ARTICLES, getArticle } from "@/components/blog/articleData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found | Speedy Pest Control" };

  return {
    title: `${article.title} | Speedy Pest Control`,
    description: article.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return <ArticlePage article={article} />;
}
