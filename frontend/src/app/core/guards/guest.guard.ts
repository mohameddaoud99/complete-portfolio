import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { AuthService } from '../auth/auth.service';
//
// export const guestGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   return authService.isAuthenticated() ? router.createUrlTree(['/dashboard']) : true;
// };

// ==========================================
// Nouvelle implémentation Supabase Auth
// ==========================================

export const guestGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return from(
    supabase.client.auth.getSession().then(({ data }) => {
      if (data.session) return router.createUrlTree(['/dashboard']);
      return true;
    })
  );
};
