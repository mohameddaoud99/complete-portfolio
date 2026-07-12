export interface MediaFile {
  id: string;
  originalFileName: string;
  contentType: string | null;
  sizeBytes: number;
  url: string;
  createdAt: string;
}
