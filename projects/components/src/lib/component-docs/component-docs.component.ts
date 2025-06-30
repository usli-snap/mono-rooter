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
  templateUrl: './component-docs.component.html',
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
