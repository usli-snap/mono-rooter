import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, signal } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule]
})
export class DropdownComponent {
  @Input() label = 'Dropdown';
  @Input() items: { text: string; icon?: string; action: () => void }[] = [];
  @Input() subnavItems: string[] = [];
  @Input() showIcons = true;
  @Input() showTabs = false;
  @Input() tabs: { title: string; content: string }[] = [];
  
  activeTab = signal(0);
  isOpen = signal(false);

  ngOnInit() {
    console.log('Dropdown items:', this.items);
    console.log('Items length:', this.items.length);
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
    console.log('Dropdown toggled:', this.isOpen());
    console.log('Current items:', this.items);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  onItemClick(item: { text: string; icon?: string; action: () => void }, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (item.action) {
      item.action();
    }
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close dropdown when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropdown();
    }
  }
}
