import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    const isBrowser = isPlatformBrowser(platformId);

    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: {
        // Disable browser-only storage for SSR compatibility.
        // Public site has no authenticated routes.
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        detectSessionInUrl: false
      }
    });
  }
}
