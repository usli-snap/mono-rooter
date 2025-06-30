import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/src/lib/layout/header/header.component';
import { SidenavComponent } from '../../../components/src/lib/layout/sidenav/sidenav.component';
import { ComponentDocsComponent } from '../../../components/src/lib/component-docs/component-docs.component';
import { DocumentationService, ComponentDoc } from '../../../components/src/lib/services/documentation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent,
    SidenavComponent,
    ComponentDocsComponent
  ],
  template: `
    <div class="app-container" [class.sidenav-collapsed]="sidenavCollapsed">

      <!-- Header -->
      <lib-header 
        [sidenavCollapsed]="sidenavCollapsed"
        (toggleSidenavEvent)="toggleSidenav()">
      </lib-header>

      <!-- Sidenav -->
      <lib-sidenav
        [(collapsed)]="sidenavCollapsed"
        [selectedComponentId]="selectedComponent?.id || null"
        (componentSelected)="onComponentSelected($event)">
      </lib-sidenav>

      <!-- Main Content -->
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
      padding-top: 60px; /* Account for fixed header */

      &.sidenav-collapsed {
        .main-content {
          margin-left: 60px;
        }
      }
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
        padding-top: 60px;

        &.sidenav-collapsed {
          .main-content {
            margin-left: 0;
          }
        }
      }

      .main-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  sidenavCollapsed = false;
  selectedComponent: ComponentDoc | null = null;
  docService = inject(DocumentationService);

  toggleSidenav(): void {
    this.sidenavCollapsed = !this.sidenavCollapsed;
  }

  onComponentSelected(component: ComponentDoc) {
    this.selectedComponent = component;
  }
}
