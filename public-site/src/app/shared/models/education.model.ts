export interface Education {
  id: string;
  institution: string;
  degree: string;
  degreeFr: string | null;
  field: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  descriptionFr: string | null;
  displayOrder: number;
}
