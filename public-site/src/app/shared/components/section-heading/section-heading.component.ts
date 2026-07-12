import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  imports: [],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss'
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly align = input<'left' | 'center'>('center');
}
