import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// import { catchError, map, of } from 'rxjs';
// import { AuthService } from '../auth/auth.service';
//
// export const authGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isAuthenticated()) return true;
//   return authService.refresh().pipe(
//     map(() => true),
//     catchError(() => of(router.createUrlTree(['/auth/login'])))
//   );
// };

// ==========================================
// Nouvelle implémentation Supabase Auth
// ==========================================

export const authGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return from(
    supabase.client.auth.getSession().then(({ data }) => {
      if (data.session) return true;
      return router.createUrlTree(['/auth/login']);
    })
  );
};
