export interface Experience {
  id: string;
  company: string;
  role: string;
  roleFr: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  descriptionFr: string | null;
  achievements: string | null;
  achievementsFr: string | null;
  displayOrder: number;
}

export type ExperienceRequest = Omit<Experience, 'id'>;
