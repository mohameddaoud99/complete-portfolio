import { Injectable, signal } from '@angular/core';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'New message received',
    description: 'A visitor sent a message through the contact form.',
    createdAt: '2026-07-06T09:15:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Project published',
    description: '"Portfolio Admin Dashboard" was marked as published.',
    createdAt: '2026-07-05T14:40:00Z',
    read: false
  },
  {
    id: '3',
    title: 'Weekly summary ready',
    description: 'Your content activity summary for last week is ready.',
    createdAt: '2026-07-01T08:00:00Z',
    read: true
  }
];

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notifications = signal<AppNotification[]>(MOCK_NOTIFICATIONS);

  markAsRead(id: string): void {
    this.notifications.update((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }
}
