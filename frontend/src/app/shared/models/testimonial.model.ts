export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string | null;
  authorRoleFr: string | null;
  authorCompany: string | null;
  avatarUrl: string | null;
  quote: string;
  quoteFr: string | null;
  published: boolean;
  displayOrder: number;
}

export type TestimonialRequest = Omit<Testimonial, 'id'>;
