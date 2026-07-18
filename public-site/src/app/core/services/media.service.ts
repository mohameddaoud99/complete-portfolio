import { Injectable } from '@angular/core';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// Les URLs relatives étaient préfixées avec mediaBaseUrl (Render backend).
// Exemple: '/uploads/avatar.jpg' → 'https://portfolio-backend-q60t.onrender.com/uploads/avatar.jpg'
//
// resolveUrl(relativeUrl: string | null | undefined): string | null {
//   if (!relativeUrl) return null;
//   return relativeUrl.startsWith('http')
//     ? relativeUrl
//     : `${environment.mediaBaseUrl}${relativeUrl}`;
// }

// ==========================================
// Nouvelle implémentation Supabase Storage
// Les URLs Supabase Storage sont déjà absolues (https://...supabase.co/storage/...)
// Aucune transformation nécessaire.
// ==========================================

@Injectable({ providedIn: 'root' })
export class MediaService {
  resolveUrl(url: string | null | undefined): string | null {
    return url ?? null;
  }
}
