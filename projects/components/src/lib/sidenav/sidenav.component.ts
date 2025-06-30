import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationService, ComponentDoc } from '../services/documentation.service';

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="sidenav" [class.collapsed]="collapsed">
      <div class="sidenav-header">
        <h2 class="sidenav-title">Components</h2>
        <button 
          class="toggle-btn"
          (click)="toggleCollapsed()"
          [attr.aria-label]="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <i class="bi" [class.bi-chevron-left]="!collapsed" [class.bi-chevron-right]="collapsed"></i>
        </button>
      </div>
      
      <div class="sidenav-content">
        <div *ngFor="let category of categories" class="category-section">
          <h3 class="category-title">{{ category }}</h3>
          <ul class="component-list">
            <li *ngFor="let component of getComponentsByCategory(category)" 
                class="component-item"
                [class.active]="component.id === selectedComponentId">
              <button 
                class="component-link"
                (click)="selectComponent(component)"
                [attr.aria-current]="component.id === selectedComponentId ? 'page' : null">
                <i class="component-icon bi" [class]="getComponentIcon(component.id)"></i>
                <span class="component-name">{{ component.name }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
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
