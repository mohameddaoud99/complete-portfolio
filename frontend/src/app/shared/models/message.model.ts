export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string | null;
  body: string;
  read: boolean;
  createdAt: string;
}
