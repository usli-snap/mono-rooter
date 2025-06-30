import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markup';

export interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  category: string;
  examples: ComponentExample[];
}

export interface ComponentExample {
  title: string;
  description: string;
  code: {
    html: string;
    typescript?: string;
    scss?: string;
  };
  preview?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private components: ComponentDoc[] = [
    {
      id: 'modal',
      name: 'Modal',
      description: 'A customizable modal dialog component for displaying content in an overlay.',
      category: 'Overlay',
      examples: [
        {
          title: 'Basic Modal',
          description: 'Simple modal with header, body, and footer',
          code: {
            html: `<ui-button (click)="openModal()">Open Modal</ui-button>
<ui-modal [isOpen]="isModalOpen" (close)="closeModal()">
  <div class="modal-header">
    <h3>Modal Title</h3>
  </div>
  <div class="modal-body">
    <p>Modal content goes here...</p>
  </div>
  <div class="modal-footer">
    <ui-button variant="secondary" (click)="closeModal()">Close</ui-button>
    <ui-button variant="primary" (click)="save()">Save</ui-button>
  </div>
</ui-modal>`,
            typescript: `export class ExampleComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  save() {
    console.log('Saving...');
    this.closeModal();
  }
}`
          }
        }
      ]
    },
    {
      id: 'button',
      name: 'Button',
      description: 'A customizable button component with various styles and states.',
      category: 'Form Controls',
      examples: [
        {
          title: 'Basic Button',
          description: 'Simple button with primary styling',
          code: {
            html: `<ui-button 
  [variant]="'primary'" 
  [size]="'medium'"
  (click)="handleClick()">
  Click Me
</ui-button>`,
            typescript: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <ui-button 
      [variant]="'primary'" 
      [size]="'medium'"
      (click)="handleClick()">
      Click Me
    </ui-button>
  \`
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}`
          }
        },
        {
          title: 'Button Variants',
          description: 'Different button styles and sizes',
          code: {
            html: `<ui-button variant="primary">Primary</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="danger">Danger</ui-button>
<ui-button variant="outline">Outline</ui-button>

<ui-button size="small">Small</ui-button>
<ui-button size="medium">Medium</ui-button>
<ui-button size="large">Large</ui-button>`
          }
        }
      ]
    },
    {
      id: 'card',
      name: 'Card',
      description: 'A flexible container component for displaying content.',
      category: 'Layout',
      examples: [
        {
          title: 'Basic Card',
          description: 'Simple card with title and content',
          code: {
            html: `<ui-card>
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here...</p>
  </div>
</ui-card>`
          }
        }
      ]
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Small status indicators and labels.',
      category: 'Display',
      examples: [
        {
          title: 'Basic Badge',
          description: 'Simple badge with different variants',
          code: {
            html: `<ui-badge variant="primary">Primary</ui-badge>
<ui-badge variant="secondary">Secondary</ui-badge>
<ui-badge variant="success">Success</ui-badge>
<ui-badge variant="warning">Warning</ui-badge>
<ui-badge variant="danger">Danger</ui-badge>`
          }
        }
      ]
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      description: 'A dropdown menu component with customizable items.',
      category: 'Navigation',
      examples: [
        {
          title: 'Basic Dropdown',
          description: 'Simple dropdown with menu items',
          code: {
            html: `<ui-dropdown 
  [items]="menuItems" 
  [label]="'Select Option'">
</ui-dropdown>`,
            typescript: `export class ExampleComponent {
  menuItems = [
    { text: 'Option 1', icon: 'bi-check', action: () => console.log('Option 1 selected') },
    { text: 'Option 2', icon: 'bi-star', action: () => console.log('Option 2 selected') },
    { text: 'Option 3', icon: 'bi-gear', action: () => console.log('Option 3 selected') }
  ];
}`
          }
        }
      ]
    },
    {
      id: 'theme-switcher',
      name: 'Theme Switcher',
      description: 'A dropdown component for switching between different themes.',
      category: 'Utilities',
      examples: [
        {
          title: 'Basic Theme Switcher',
          description: 'Theme switcher with all available themes',
          code: {
            html: `<lib-theme-switcher></lib-theme-switcher>`,
            typescript: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <lib-theme-switcher></lib-theme-switcher>
  \`
})
export class ExampleComponent {
  // Theme switcher handles all theme management automatically
}`
          }
        }
      ]
    }
  ];

  constructor() {
    this.setupMarked();
  }

  private setupMarked() {
    marked.use(markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = Prism.languages[lang];
        if (language) {
          return Prism.highlight(code, language, lang);
        }
        return code;
      }
    }));
  }

  getComponents(): ComponentDoc[] {
    return this.components;
  }

  getComponent(id: string): ComponentDoc | undefined {
    return this.components.find(comp => comp.id === id);
  }

  getCategories(): string[] {
    const categories = this.components.map(comp => comp.category);
    return [...new Set(categories)];
  }

  getComponentsByCategory(category: string): ComponentDoc[] {
    return this.components.filter(comp => comp.category === category);
  }

  async renderMarkdown(markdown: string): Promise<string> {
    return await marked(markdown);
  }

  highlightCode(code: string, language: string): string {
    const lang = Prism.languages[language];
    if (lang) {
      return Prism.highlight(code, lang, language);
    }
    return code;
  }
}
