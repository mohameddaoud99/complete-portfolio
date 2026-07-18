import { HttpInterceptorFn } from '@angular/common/http';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// This interceptor attached JWT tokens from Spring Boot to every HttpClient request
// and handled automatic token refresh on 401 responses.
//
// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, switchMap, throwError } from 'rxjs';
// import { AuthService } from '../auth/auth.service';
//
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const accessToken = authService.getAccessToken();
//   const authorizedRequest = accessToken
//     ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
//     : req;
//   return next(authorizedRequest).pipe(
//     catchError((error: unknown) => {
//       const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
//       if (error instanceof HttpErrorResponse && error.status === 401 && !isAuthEndpoint) {
//         return authService.refresh().pipe(
//           switchMap(() => {
//             const retriedRequest = req.clone({
//               setHeaders: { Authorization: `Bearer ${authService.getAccessToken()}` }
//             });
//             return next(retriedRequest);
//           }),
//           catchError((refreshError: unknown) => {
//             authService.clearSession();
//             router.navigate(['/auth/login']);
//             return throwError(() => refreshError);
//           })
//         );
//       }
//       return throwError(() => error);
//     })
//   );
// };

// ==========================================
// Nouvelle implémentation Supabase Auth
// ==========================================
// The Supabase SDK manages authentication headers automatically.
// This interceptor is kept as a passthrough for compatibility.

export const authInterceptor: HttpInterceptorFn = (req, next) => next(req);
