import { Injectable, computed, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { Observable, from, throwError } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';
// import { ApiResponse } from '../../shared/models/api-response.model';
// import { LoginResponse, UserProfile } from '../../shared/models/user.model';
//
// login(usernameOrEmail: string, password: string): Observable<ApiResponse<LoginResponse>> {
//   return this.http.post<ApiResponse<LoginResponse>>(
//     `${environment.apiUrl}/auth/login`,
//     { usernameOrEmail, password },
//     { withCredentials: true }
//   ).pipe(tap((response) => this.applySession(response.data)));
// }
//
// refresh(): Observable<ApiResponse<LoginResponse>> {
//   return this.http.post<ApiResponse<LoginResponse>>(
//     `${environment.apiUrl}/auth/refresh`, {}, { withCredentials: true }
//   ).pipe(tap((response) => this.applySession(response.data)));
// }
//
// logout(): Observable<ApiResponse<void>> {
//   return this.http.post<ApiResponse<void>>(
//     `${environment.apiUrl}/auth/logout`, {}, { withCredentials: true }
//   ).pipe(tap(() => this.clearSession()));
// }
//
// changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<void>> {
//   return this.http.put<ApiResponse<void>>(`${environment.apiUrl}/auth/change-password`, {
//     currentPassword, newPassword
//   });
// }

// ==========================================
// Nouvelle implémentation Supabase Auth
// ==========================================

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<Session | null>(null);
  private readonly userSignal = signal<User | null>(null);

  readonly currentUser = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.sessionSignal() !== null);

  constructor(private readonly supabaseService: SupabaseService) {
    // Restore session on startup
    this.supabaseService.client.auth.getSession().then(({ data }) => {
      this.sessionSignal.set(data.session);
      this.userSignal.set(data.session?.user ?? null);
    });

    // Keep signals in sync with Supabase auth state changes
    this.supabaseService.client.auth.onAuthStateChange((_event, session) => {
      this.sessionSignal.set(session);
      this.userSignal.set(session?.user ?? null);
    });
  }

  getAccessToken(): string | null {
    return this.sessionSignal()?.access_token ?? null;
  }

  login(email: string, password: string): Observable<void> {
    return from(
      this.supabaseService.client.auth
        .signInWithPassword({ email, password })
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  logout(): Observable<void> {
    return from(
      this.supabaseService.client.auth.signOut().then(({ error }) => {
        if (error) throw error;
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    const user = this.userSignal();
    if (!user?.email) {
      return throwError(() => new Error('Not authenticated'));
    }

    const email = user.email;
    return from(
      // Re-authenticate to verify current password before changing
      this.supabaseService.client.auth
        .signInWithPassword({ email, password: currentPassword })
        .then(({ error }) => {
          if (error) throw new Error('Current password is incorrect.');
        })
        .then(() => this.supabaseService.client.auth.updateUser({ password: newPassword }))
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  clearSession(): void {
    this.sessionSignal.set(null);
    this.userSignal.set(null);
  }
}
