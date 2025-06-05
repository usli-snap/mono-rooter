import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonParams } from './buttons.types';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class UIButtonComponent {
  @Input() variant: ButtonParams['variant'] = 'primary';
  @Input() size: ButtonParams['size'] = 'md';
  @Input() type: ButtonParams['type'] = 'button';
  @Input() disabled?: false;
  @Input() label?: string = 'Button';
  @Input() icon?: string;
  @Input() iconPosition?: ButtonParams['iconPosition'] = 'start';
  @Input() ariaLabel?: string;
  @Input() addedClasses?: string;
  @Input() loading?: boolean;
  @Input() loadingText?: string;
  @Input() set params(p: ButtonParams | null) {
    if (!p) return;
    Object.assign(this, { ...this, ...p });
  }

  @Output() click = new EventEmitter<void>();

  get styles(): string[] {
    return [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
      this.addedClasses || '',
      this.loading ? 'loading' : '', 'ripple'
    ];
  }

  handleClick() {
    // Prevent click event if button is disabled or loading
    if (!this.disabled && !this.loading) {
      this.click.emit();
    } else {
      console.error('Button is disabled or loading, clicking is not permitted.');
    }
  }
}
