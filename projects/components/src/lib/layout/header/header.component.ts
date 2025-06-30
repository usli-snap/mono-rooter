import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../../../lib/theme-switcher/theme-switcher.component'

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() sidenavCollapsed = false;
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  toggleSidenav(): void {
    this.toggleSidenavEvent.emit();
  }
}
