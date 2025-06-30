import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeSwitcherComponent } from '../../../components/src/lib/theme-switcher/theme-switcher.component';
import { SidenavComponent } from '../../../components/src/lib/sidenav/sidenav.component';
import { ComponentDocsComponent } from '../../../components/src/lib/component-docs/component-docs.component';
import { DocumentationService, ComponentDoc } from '../../../components/src/lib/services/documentation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ThemeSwitcherComponent,
    SidenavComponent,
    ComponentDocsComponent
  ],
  template: `
    <div class="app-container" [class.sidenav-collapsed]="sidenavCollapsed">
      <!-- Theme Switcher -->
      <div class="theme-switcher-container">
        <lib-theme-switcher></lib-theme-switcher>
      </div>

      <!-- Documentation Layout -->
      <lib-sidenav
        [(collapsed)]="sidenavCollapsed"
        [selectedComponentId]="selectedComponent?.id || null"
        (componentSelected)="onComponentSelected($event)">
      </lib-sidenav>

      <main class="main-content">
        <lib-component-docs [component]="selectedComponent"></lib-component-docs>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--bg-primary);
      transition: var(--transition);

      &.sidenav-collapsed {
        .main-content {
          margin-left: 60px;
        }
      }
    }

    .theme-switcher-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1100;
    }

    .main-content {
      flex: 1;
      margin-left: 280px;
      transition: var(--transition);
      padding-top: 4rem;
    }

    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;

        &.sidenav-collapsed {
          .main-content {
            margin-left: 0;
            margin-top: 60px;
          }
        }
      }

      .main-content {
        margin-left: 0;
        margin-top: 280px;
        padding-top: 1rem;
      }

      .theme-switcher-container {
        top: 0.5rem;
        right: 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  sidenavCollapsed = false;
  selectedComponent: ComponentDoc | null = null;
  docService = inject(DocumentationService);

  onComponentSelected(component: ComponentDoc) {
    this.selectedComponent = component;
  }
}
