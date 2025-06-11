import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface DropdownItem {
  label: string;
  icon?: string; // Optional icon class (Material Icons, FontAwesome, etc.)
  href?: string; // External link
  routerLink?: string; // Angular router link
  action?: () => void; // Function to execute
  submenu?: DropdownItem[]; // Nested submenu items
}
@Component({
  selector: 'lib-testdrop',
  imports: [CommonModule],
  templateUrl: './testdrop.component.html',
  styleUrl: './testdrop.component.scss'
})
export class TestdropComponent {
  @Input() menuItems: DropdownItem[] = [];
  @Input() label: string = 'Dropdown';
  @Input() icon: string = ''; // Optional dropdown button icon

  isOpen = false; // Track dropdown state

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onItemClick(item: DropdownItem, event: Event) {
    //event.stopPropagation(); // Prevent closing the dropdown on click

    if (item.href) {
      window.open(item.href, '_blank'); // Open external link
    } else if (item.routerLink) {
      this.router.navigate([item.routerLink]); // Navigate using Angular Router
      this.isOpen = false; // Close dropdown after navigation
    } else if (item.action) {
      item.action(); // Execute function
      this.isOpen = false; // Close dropdown after execution
    }
  }
}
