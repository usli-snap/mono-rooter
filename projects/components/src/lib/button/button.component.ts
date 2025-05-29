import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[usliBtn]', // Remove 'button' from selector
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true
})
export class ButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() size: string = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: string = 'left';
  @Input() btnLabel: string = 'Button';

  get buttonClasses(): { [key: string]: boolean } {
    return {
      'btn': true,
      [`btn-${this.color}`]: true,
      [`btn-${this.size}`]: true
    };
  }

  ngOnInit(): void {
    if (!['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(this.color)) {
      this.color = 'primary';
    }
    if (!['small', 'medium', 'large'].includes(this.size)) {
      this.size = 'medium';
    }
  }
}
