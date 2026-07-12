import { Component } from '@angular/core';

interface MessagePreview {
  sender: string;
  excerpt: string;
  receivedAt: string;
}

const MESSAGE_PREVIEWS: MessagePreview[] = [
  { sender: 'Sarah Chen', excerpt: 'Interested in discussing a potential collaboration on...', receivedAt: '2h ago' },
  { sender: 'Marc Dubois', excerpt: 'Loved your portfolio! Are you available for freelance...', receivedAt: '1d ago' },
  { sender: 'HR at Nova Labs', excerpt: 'We would like to schedule a technical interview...', receivedAt: '3d ago' }
];

@Component({
  selector: 'app-messages-preview',
  imports: [],
  templateUrl: './messages-preview.component.html',
  styleUrl: './messages-preview.component.scss'
})
export class MessagesPreviewComponent {
  readonly messages = MESSAGE_PREVIEWS;
}
