export interface Profile {
  id: string;
  fullName: string;
  title: string | null;
  titleFr: string | null;
  bio: string | null;
  bioFr: string | null;
  avatarUrl: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  websiteUrl: string | null;
  resumeUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string;
}
