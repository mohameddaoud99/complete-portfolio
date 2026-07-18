import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Message } from '../../../shared/models/message.model';
import { SupabaseService } from '../../../core/supabase/supabase.service';

// ==========================================
// Legacy Spring Boot implementation
// Conservée uniquement comme référence
// ==========================================
// list():       GET    ${environment.apiUrl}/messages
// get(id):      GET    ${environment.apiUrl}/messages/:id
// markAsRead(): PATCH  ${environment.apiUrl}/messages/:id/read
// delete():     DELETE ${environment.apiUrl}/messages/:id

// ==========================================
// Nouvelle implémentation Supabase
// ==========================================

@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  constructor(private readonly supabase: SupabaseService) {}

  list(): Observable<Message[]> {
    return from(
      this.supabase.client
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return (data ?? []).map(this.toModel);
        })
    );
  }

  get(id: string): Observable<Message> {
    return from(
      this.supabase.client
        .from('messages')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  markAsRead(id: string): Observable<Message> {
    return from(
      this.supabase.client
        .from('messages')
        .update({ read: true })
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return this.toModel(data);
        })
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.supabase.client
        .from('messages')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }

  private toModel(row: Record<string, unknown>): Message {
    return {
      id: row['id'] as string,
      senderName: row['sender_name'] as string,
      senderEmail: row['sender_email'] as string,
      subject: row['subject'] as string | null,
      body: row['body'] as string,
      read: row['read'] as boolean,
      createdAt: row['created_at'] as string
    };
  }
}
