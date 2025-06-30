import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDoc, ComponentExample, DocumentationService } from '../services/documentation.service';
import { CodeCopyComponent } from '../code-copy/code-copy.component';
import { UIButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'lib-component-docs',
  standalone: true,
  imports: [
    CommonModule, 
    CodeCopyComponent, 
    UIButtonComponent, 
    CardComponent, 
    BadgeComponent, 
    DropdownComponent,
    ThemeSwitcherComponent
  ],
  template: `
    <div class="component-docs" *ngIf="component">
      <header class="docs-header">
        <h1 class="component-title">{{ component.name }}</h1>
        <span class="component-category">{{ component.category }}</span>
      </header>

      <div class="component-description">
        <p>{{ component.description }}</p>
      </div>

      <div class="examples-section">
        <div *ngFor="let example of component.examples; let i = index" class="example-container">
          <div class="example-header">
            <h2 class="example-title">{{ example.title }}</h2>
            <p class="example-description">{{ example.description }}</p>
          </div>

          <!-- Component Preview -->
          <div class="component-preview">
            <h3 class="preview-title">Preview</h3>
            <div class="preview-container" [attr.data-component]="component.id">
              <ng-container [ngSwitch]="component.id">
                <!-- Button Examples -->
                <div *ngSwitchCase="'button'" class="button-examples">
                  <div *ngIf="example.title === 'Basic Button'" class="example-demo">
                    <ui-button 
                      [variant]="'primary'" 
                      [size]="'md'"
                      (click)="handleExampleClick('Button clicked!')">
                      Click Me
                    </ui-button>
                  </div>
                  <div *ngIf="example.title === 'Button Variants'" class="example-demo button-variants">
                    <ui-button variant="primary">Primary</ui-button>
                    <ui-button variant="secondary">Secondary</ui-button>
                    <ui-button variant="warning">Warning</ui-button>
                    <ui-button variant="text">Text</ui-button>
                    <div class="size-examples">
                      <ui-button size="sm">Small</ui-button>
                      <ui-button size="md">Medium</ui-button>
                      <ui-button size="lg">Large</ui-button>
                    </div>
                  </div>
                </div>

                <!-- Card Examples -->
                <div *ngSwitchCase="'card'" class="card-examples">
                  <ui-card>
                    <div class="card-header">
                      <h3>Card Title</h3>
                    </div>
                    <div class="card-body">
                      <p>Card content goes here...</p>
                    </div>
                  </ui-card>
                </div>

                <!-- Badge Examples -->
                <div *ngSwitchCase="'badge'" class="badge-examples">
                  <ui-badge variant="primary">Primary</ui-badge>
                  <ui-badge variant="secondary">Secondary</ui-badge>
                  <ui-badge variant="success">Success</ui-badge>
                  <ui-badge variant="warning">Warning</ui-badge>
                  <ui-badge variant="danger">Danger</ui-badge>
                </div>

                <!-- Dropdown Examples -->
                <div *ngSwitchCase="'dropdown'" class="dropdown-examples">
                  <ui-dropdown 
                    [items]="exampleMenuItems" 
                    [label]="'Select Option'">
                  </ui-dropdown>
                </div>

                <!-- Theme Switcher Examples -->
                <div *ngSwitchCase="'theme-switcher'" class="theme-switcher-examples">
                  <lib-theme-switcher></lib-theme-switcher>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- Code Examples -->
          <div class="code-examples">
            <div class="code-tabs">
              <button 
                *ngFor="let tab of getCodeTabs(example)" 
                class="tab-button"
                [class.active]="tab === activeTab"
                (click)="setActiveTab(tab)">
                {{ tab.toUpperCase() }}
              </button>
            </div>

            <div class="code-content">
              <lib-code-copy 
                [code]="getCodeForTab(example, activeTab)"
                [language]="getLanguageForTab(activeTab)">
              </lib-code-copy>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-component" *ngIf="!component">
      <div class="no-component-content">
        <i class="bi bi-puzzle no-component-icon"></i>
        <h2>Select a Component</h2>
        <p>Choose a component from the sidebar to view its documentation and examples.</p>
      </div>
    </div>
  `,
  styleUrls: ['./component-docs.component.scss']
})
export class ComponentDocsComponent {
  @Input() component: ComponentDoc | null = null;
  
  activeTab = 'html';
  
  exampleMenuItems = [
    { text: 'Option 1', icon: 'bi-check', action: () => this.handleExampleClick('Option 1 selected') },
    { text: 'Option 2', icon: 'bi-star', action: () => this.handleExampleClick('Option 2 selected') },
    { text: 'Option 3', icon: 'bi-gear', action: () => this.handleExampleClick('Option 3 selected') }
  ];

  private docService = inject(DocumentationService);

  getCodeTabs(example: ComponentExample): string[] {
    const tabs = ['html'];
    if (example.code.typescript) tabs.push('typescript');
    if (example.code.scss) tabs.push('scss');
    return tabs;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getCodeForTab(example: ComponentExample, tab: string): string {
    switch (tab) {
      case 'html':
        return example.code.html;
      case 'typescript':
        return example.code.typescript || '';
      case 'scss':
        return example.code.scss || '';
      default:
        return example.code.html;
    }
  }

  getLanguageForTab(tab: string): string {
    switch (tab) {
      case 'html':
        return 'markup';
      case 'typescript':
        return 'typescript';
      case 'scss':
        return 'scss';
      default:
        return 'markup';
    }
  }

  handleExampleClick(message: string) {
    console.log(message);
    // You could also show a toast notification here
  }
}
