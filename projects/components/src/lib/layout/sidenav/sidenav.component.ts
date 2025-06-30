import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationService, ComponentDoc } from '../../services/documentation.service';

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() collapsed = false;
  @Input() selectedComponentId: string | null = null;
  @Output() componentSelected = new EventEmitter<ComponentDoc>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  categories: string[] = [];
  
  private docService = inject(DocumentationService);

  ngOnInit() {
    this.categories = this.docService.getCategories();
  }

  getComponentsByCategory(category: string): ComponentDoc[] {
    return this.docService.getComponentsByCategory(category);
  }

  selectComponent(component: ComponentDoc) {
    this.componentSelected.emit(component);
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  getComponentIcon(componentId: string): string {
    const iconMap: { [key: string]: string } = {
      'button': 'bi-square',
      'card': 'bi-card-text',
      'badge': 'bi-award',
      'dropdown': 'bi-chevron-down',
      'theme-switcher': 'bi-palette'
    };
    return iconMap[componentId] || 'bi-puzzle';
  }
}
