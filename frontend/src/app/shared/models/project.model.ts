export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  summaryFr: string | null;
  description: string | null;
  descriptionFr: string | null;
  techStack: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  category: string | null;
  screenshots: string | null;
  featured: boolean;
  displayOrder: number;
}

export type ProjectRequest = Omit<Project, 'id' | 'slug'>;
