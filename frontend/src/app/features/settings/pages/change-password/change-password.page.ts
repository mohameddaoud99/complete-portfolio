import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-change-password-page',
  imports: [ReactiveFormsModule, ButtonModule, PasswordModule, PageHeaderComponent],
  templateUrl: './change-password.page.html',
  styleUrl: './change-password.page.scss'
})
export class ChangePasswordPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  submit(): void {
    const { currentPassword, newPassword, confirmPassword } = this.form.getRawValue();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (newPassword !== confirmPassword) {
      this.errorMessage.set('New password and confirmation do not match.');
      return;
    }

    this.errorMessage.set(null);
    this.saving.set(true);

    // ==========================================
    // Legacy Spring Boot implementation
    // Conservée uniquement comme référence
    // ==========================================
    // this.authService.changePassword(currentPassword, newPassword).subscribe({...})
    // → PUT ${environment.apiUrl}/auth/change-password

    // ==========================================
    // Nouvelle implémentation Supabase Auth
    // Re-authenticates with current password, then calls auth.updateUser()
    // ==========================================
    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.saving.set(false);
        this.form.reset();
        this.messageService.add({ severity: 'success', summary: 'Password updated' });
      },
      error: (error: Error) => {
        this.saving.set(false);
        this.errorMessage.set(error?.message ?? 'Failed to update password.');
      }
    });
  }
}
