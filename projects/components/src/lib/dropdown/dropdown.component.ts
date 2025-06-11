import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule],
})
export class DropdownComponent {
  @Input() label = 'Dropdown';
  @Input() items: { text: string; icon?: string; action: () => void }[] = [];
  @Input() subnavItems: string[] = [];
  @Input() showIcons = true;
  @Input() showTabs = false;
  @Input() tabs: { title: string; content: string }[] = [];
  activeTab = 0;
}