import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDoc, ComponentExample, DocumentationService } from '../services/documentation.service';
import { CodeCopyComponent } from '../code-copy/code-copy.component';
import { UIButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { BadgeComponent } from '../badge/badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

interface ComponentAttribute {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

interface ParsedComponentProps {
  [key: string]: any;
}

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

  // Component attributes definitions
  private componentAttributes: { [componentId: string]: ComponentAttribute[] } = {
    'button': [
      { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'text'", description: 'Visual style variant of the button', default: 'primary' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: 'Size of the button', default: 'md' },
      { name: 'type', type: "'button' | 'submit' | 'reset'", description: 'HTML button type', default: 'button' },
      { name: 'disabled', type: 'boolean', description: 'Whether the button is disabled', default: 'false' },
      { name: 'label', type: 'string', description: 'Text content of the button', default: 'Button' },
      { name: 'icon', type: 'string', description: 'Icon class to display in the button' },
      { name: 'iconPosition', type: "'start' | 'both' | 'end'", description: 'Position of the icon relative to text', default: 'start' },
      { name: 'ariaLabel', type: 'string', description: 'Accessibility label for screen readers' },
      { name: 'addedClasses', type: 'string', description: 'Additional CSS classes to apply' },
      { name: 'loading', type: 'boolean', description: 'Whether the button is in loading state', default: 'false' },
      { name: 'loadingText', type: 'string', description: 'Text to display when loading' },
      { name: '(click)', type: 'EventEmitter<void>', description: 'Event emitted when button is clicked', required: false }
    ],
    'badge': [
      { name: 'label', type: 'string', description: 'Text content of the badge', default: '' },
      { name: 'type', type: "'primary' | 'success' | 'danger' | 'warning'", description: 'Visual style variant of the badge', default: 'primary' },
      { name: 'prefixIcon', type: 'string', description: 'Icon class to display before the label' },
      { name: 'suffixIcon', type: 'string', description: 'Icon class to display after the label' }
    ],
    'card': [
      { name: 'content', type: 'ng-content', description: 'Content to be displayed inside the card', required: true }
    ],
    'dropdown': [
      { name: 'label', type: 'string', description: 'Label text for the dropdown trigger', default: 'Dropdown' },
      { name: 'items', type: 'Array<{text: string, icon?: string, action: () => void}>', description: 'Array of menu items to display', default: '[]' },
      { name: 'subnavItems', type: 'string[]', description: 'Array of subnav item labels', default: '[]' },
      { name: 'showIcons', type: 'boolean', description: 'Whether to display icons in menu items', default: 'true' },
      { name: 'showTabs', type: 'boolean', description: 'Whether to display tabs interface', default: 'false' },
      { name: 'tabs', type: 'Array<{title: string, content: string}>', description: 'Array of tab configurations', default: '[]' }
    ],
    'theme-switcher': [
      { name: 'standalone', type: 'component', description: 'Self-contained theme switching component with no inputs required' }
    ]
  };

  getComponentAttributes(): ComponentAttribute[] {
    if (!this.component) return [];
    return this.componentAttributes[this.component.id] || [];
  }

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

  // Parse component properties from HTML example
  parseComponentProps(example: ComponentExample, componentId: string): ParsedComponentProps {
    const html = example.code.html;
    const props: ParsedComponentProps = {};

    try {
      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Find the component element based on component ID
      let selector = '';
      switch (componentId) {
        case 'button':
          selector = 'ui-button';
          break;
        case 'badge':
          selector = 'ui-badge';
          break;
        case 'card':
          selector = 'ui-card';
          break;
        case 'dropdown':
          selector = 'ui-dropdown';
          break;
        case 'theme-switcher':
          selector = 'lib-theme-switcher';
          break;
        default:
          return props;
      }

      const element = doc.querySelector(selector);
      if (!element) return props;

      // Extract attributes and their values
      Array.from(element.attributes).forEach(attr => {
        const name = attr.name;
        let value = attr.value;

        // Handle Angular property binding syntax
        if (name.startsWith('[') && name.endsWith(']')) {
          const propName = name.slice(1, -1);
          // Try to parse the value as JSON for complex types
          try {
            props[propName] = JSON.parse(value.replace(/'/g, '"'));
          } catch {
            // If parsing fails, treat as string
            props[propName] = value.replace(/['"]/g, '');
          }
        } else if (name.startsWith('(') && name.endsWith(')')) {
          // Event binding - we'll handle this in the template
          const eventName = name.slice(1, -1);
          props[`(${eventName})`] = value;
        } else {
          // Regular attribute
          props[name] = value;
        }
      });

      // Extract text content for components that use it
      if (componentId === 'button' && element.textContent?.trim()) {
        props['content'] = element.textContent.trim();
      }

      // Extract inner HTML for card component
      if (componentId === 'card' && element.innerHTML?.trim()) {
        props['innerHTML'] = element.innerHTML.trim();
      }

    } catch (error) {
      console.warn('Error parsing component props:', error);
    }

    return props;
  }

  // Get parsed props for a specific example
  getExampleProps(example: ComponentExample): ParsedComponentProps {
    if (!this.component) return {};
    return this.parseComponentProps(example, this.component.id);
  }

  // Helper methods for specific component types
  getButtonProps(example: ComponentExample): any {
    const props = this.getExampleProps(example);
    return {
      variant: props['variant'] || 'primary',
      size: props['size'] || 'md',
      disabled: props['disabled'] === 'true' || props['disabled'] === true,
      loading: props['loading'] === 'true' || props['loading'] === true,
      content: props['content'] || 'Button'
    };
  }

  getBadgeProps(example: ComponentExample): any {
    const props = this.getExampleProps(example);
    return {
      type: props['type'] || props['variant'] || 'primary',
      label: props['label'] || props['content'] || 'Badge'
    };
  }

  getDropdownProps(example: ComponentExample): any {
    const props = this.getExampleProps(example);
    // Always use the exampleMenuItems array instead of trying to parse from HTML
    return {
      label: props['label'] || 'Select Option',
      items: this.exampleMenuItems
    };
  }

  handleExampleClick(message: string) {
    console.log(message);
    // You could also show a toast notification here
  }
}
