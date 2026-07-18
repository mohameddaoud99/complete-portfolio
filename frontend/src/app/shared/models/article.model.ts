export interface Article {
  id: string;
  title: string;
  titleFr: string | null;
  slug: string;
  excerpt: string | null;
  excerptFr: string | null;
  contentHtml: string | null;
  contentHtmlFr: string | null;
  coverImageUrl: string | null;
  images: string | null;
  category: string | null;
  tags: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export type ArticleRequest = Omit<Article, 'id' | 'slug' | 'publishedAt' | 'createdAt'>;
