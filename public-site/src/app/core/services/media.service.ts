import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MediaService {
  resolveUrl(relativeUrl: string | null | undefined): string | null {
    if (!relativeUrl) {
      return null;
    }
    return relativeUrl.startsWith('http') ? relativeUrl : `${environment.mediaBaseUrl}${relativeUrl}`;
  }
}
