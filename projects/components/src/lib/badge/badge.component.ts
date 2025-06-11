import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() text: string = '';
  @Input() type: 'primary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
}