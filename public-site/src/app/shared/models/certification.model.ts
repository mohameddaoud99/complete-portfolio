export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string | null;
  badgeImageUrl: string | null;
  images: string | null;
  displayOrder: number;
}
