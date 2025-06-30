# Component Documentation Automation Script

This bash script automates the process of adding new components to the Angular documentation system. It handles all the necessary file updates and can even generate basic component files if they don't exist.

## Features

- 🚀 **Automated Setup**: Handles all file modifications automatically
- 📝 **Interactive Prompts**: Guides you through the component setup process
- 🎨 **Smart Naming**: Automatically generates component names, selectors, and IDs
- 🔧 **Component Generation**: Creates basic component files if they don't exist
- 💾 **Backup & Recovery**: Creates backups and can restore on errors
- ✅ **Validation**: Validates inputs and checks for existing components
- 🎯 **Category Selection**: Choose from predefined categories or create custom ones

## Usage

### Prerequisites

- Make sure you're in the root directory of your Angular workspace (where the `projects` folder is located)
- Ensure you have bash available (Linux/macOS/WSL/Git Bash on Windows)

### Running the Script

```bash
./add-component-docs.sh
```

### Interactive Process

The script will guide you through the following steps:

1. **Component Name**: Enter the display name (e.g., "Alert", "Data Table")
2. **Component Description**: Describe what the component does
3. **Category Selection**: Choose from:
   - Form Controls
   - Layout
   - Display
   - Navigation
   - Utilities
   - Overlay
   - Custom (enter your own)
4. **Component Path**: Specify the file path (optional, auto-generated if empty)
5. **Example Details**: Provide example title and description
6. **HTML Example**: Enter the HTML usage example
7. **TypeScript Example**: Enter optional TypeScript code example
8. **Confirmation**: Review and confirm the setup

### Example Session

```bash
$ ./add-component-docs.sh

================================
  Component Documentation Setup
================================

Let's add a new component to the documentation system!

Enter component name (e.g., 'Alert', 'Data Table'): Alert
[INFO] Generated names:
  Component ID: alert
  Component Class: AlertComponent
  Component Selector: ui-alert

Enter component description: A flexible alert component for displaying important messages
Select category (1-7) or enter custom: 3
Enter component path (or press Enter for 'alert/ui-alert.component'): 
Enter example title (default: 'Basic Alert'): 
Enter example description (default: 'Simple Alert example'): 
Enter HTML example (press Enter twice when done):
<ui-alert variant="success">
  Operation completed successfully!
</ui-alert>

Enter TypeScript example (optional, press Enter twice when done):
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <ui-alert variant="success">
      Operation completed successfully!
    </ui-alert>
  `
})
export class ExampleComponent {}

================================
  Component Documentation Setup
================================
Summary:
  Name: Alert
  ID: alert
  Class: AlertComponent
  Selector: ui-alert
  Category: Display
  Path: alert/ui-alert.component
  Description: A flexible alert component for displaying important messages

Proceed with adding this component? (Y/n): Y
```

## What the Script Does

### 1. File Modifications

The script automatically updates these files:

- **`projects/components/src/lib/services/documentation.service.ts`**
  - Adds component documentation object with examples
  
- **`projects/components/src/lib/component-docs/component-docs.component.ts`**
  - Adds component import
  - Adds component to imports array
  - Adds preview template case
  
- **`projects/components/src/public-api.ts`**
  - Exports the new component

### 2. Component Generation (if needed)

If the component files don't exist, the script generates:

- **Component TypeScript file** (`.ts`)
- **Component SCSS file** (`.scss`)
- **Component HTML template** (`.html`)
- **Component test file** (`.spec.ts`)

### 3. Safety Features

- **Backups**: Creates backups of all modified files
- **Validation**: Checks inputs and existing components
- **Recovery**: Restores backups if errors occur
- **Confirmation**: Shows summary before making changes

## Generated Component Structure

When the script generates a new component, it creates a basic structure:

```typescript
// alert.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-alert">
      <h3>Alert Component</h3>
      <p>This is a basic Alert component.</p>
    </div>
  `,
  styleUrls: ['./ui-alert.component.scss']
})
export class AlertComponent {
  @Input() variant: string = 'default';
}
```

## Naming Conventions

The script automatically generates consistent naming:

| Input | Generated Names |
|-------|----------------|
| "Alert" | ID: `alert`, Class: `AlertComponent`, Selector: `ui-alert` |
| "Data Table" | ID: `data-table`, Class: `DataTableComponent`, Selector: `ui-data-table` |
| "Navigation Menu" | ID: `navigation-menu`, Class: `NavigationMenuComponent`, Selector: `ui-navigation-menu` |

## Troubleshooting

### Script Won't Run
```bash
# Make sure the script is executable
chmod +x add-component-docs.sh

# Check if you're in the right directory
ls projects/components
```

### Component Already Exists
The script will detect existing components and ask if you want to update them.

### Backup Recovery
If something goes wrong, the script automatically restores backups. Manual recovery:
```bash
# Restore backups manually if needed
mv projects/components/src/lib/services/documentation.service.ts.backup projects/components/src/lib/services/documentation.service.ts
mv projects/components/src/lib/component-docs/component-docs.component.ts.backup projects/components/src/lib/component-docs/component-docs.component.ts
mv projects/components/src/public-api.ts.backup projects/components/src/public-api.ts
```

## After Running the Script

1. **Review Generated Files**: Check the component files and customize as needed
2. **Start Development Server**: Run `npm start` to see your component
3. **View Documentation**: Navigate to your component in the sidebar
4. **Customize**: Update the component implementation, styling, and examples

## Tips

- Use descriptive component names that clearly indicate their purpose
- Provide comprehensive HTML and TypeScript examples
- Choose appropriate categories to help users find components
- Test your component in the documentation after adding it

## Script Features in Detail

### Smart Name Generation
- Converts any input to proper kebab-case, PascalCase, and camelCase
- Handles spaces, special characters, and mixed cases
- Generates consistent Angular naming conventions

### Category Management
- Predefined categories match the existing documentation structure
- Custom categories allow for project-specific organization
- Categories are used for sidebar grouping

### Error Handling
- Validates all inputs before processing
- Creates backups before making changes
- Provides clear error messages and recovery options
- Checks for existing components to prevent duplicates

### Flexibility
- Works with existing components or generates new ones
- Allows custom file paths and naming
- Supports optional TypeScript examples
- Handles multi-line code examples
