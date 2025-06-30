#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Component Documentation Setup${NC}"
    echo -e "${BLUE}================================${NC}"
    echo
}

# Function to convert string to kebab-case
to_kebab_case() {
    echo "$1" | sed 's/[A-Z]/-&/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]'
}

# Function to convert string to PascalCase
to_pascal_case() {
    echo "$1" | sed 's/[^a-zA-Z0-9]/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1' | sed 's/ //g'
}

# Function to convert string to camelCase
to_camel_case() {
    pascal=$(to_pascal_case "$1")
    echo "${pascal:0:1}" | tr '[:upper:]' '[:lower:]'${pascal:1}
}

# Function to validate inputs
validate_input() {
    if [[ -z "$1" ]]; then
        print_error "Input cannot be empty!"
        return 1
    fi
    return 0
}

# Function to check if component already exists
check_component_exists() {
    local component_id="$1"
    if grep -q "id: '$component_id'" projects/components/src/lib/services/documentation.service.ts; then
        print_warning "Component with ID '$component_id' already exists in documentation!"
        read -p "Do you want to continue and update it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return 1
        fi
    fi
    return 0
}

# Function to backup files
backup_files() {
    print_status "Creating backups..."
    cp projects/components/src/lib/services/documentation.service.ts projects/components/src/lib/services/documentation.service.ts.backup
    cp projects/components/src/lib/component-docs/component-docs.component.ts projects/components/src/lib/component-docs/component-docs.component.ts.backup
    cp projects/components/src/public-api.ts projects/components/src/public-api.ts.backup
}

# Function to restore backups
restore_backups() {
    print_warning "Restoring backups due to error..."
    mv projects/components/src/lib/services/documentation.service.ts.backup projects/components/src/lib/services/documentation.service.ts
    mv projects/components/src/lib/component-docs/component-docs.component.ts.backup projects/components/src/lib/component-docs/component-docs.component.ts
    mv projects/components/src/public-api.ts.backup projects/components/src/public-api.ts
}

# Function to clean up backups
cleanup_backups() {
    rm -f projects/components/src/lib/services/documentation.service.ts.backup
    rm -f projects/components/src/lib/component-docs/component-docs.component.ts.backup
    rm -f projects/components/src/public-api.ts.backup
}

# Function to add component to documentation service
add_to_documentation_service() {
    local component_id="$1"
    local component_name="$2"
    local component_description="$3"
    local component_category="$4"
    local component_selector="$5"
    local example_title="$6"
    local example_description="$7"
    local html_example="$8"
    local ts_example="$9"

    print_status "Adding component to documentation service..."

    # Create the component documentation object
    local component_doc="    {
      id: '$component_id',
      name: '$component_name',
      description: '$component_description',
      category: '$component_category',
      examples: [
        {
          title: '$example_title',
          description: '$example_description',
          code: {
            html: \`$html_example\`,
            typescript: \`$ts_example\`
          }
        }
      ]
    },"

    # Add to documentation service
    sed -i "/private components: ComponentDoc\[\] = \[/a\\
$component_doc" projects/components/src/lib/services/documentation.service.ts

    print_status "✓ Added to documentation service"
}

# Function to add component import and usage to component-docs
add_to_component_docs() {
    local component_class="$1"
    local component_path="$2"
    local component_id="$3"
    local component_selector="$4"

    print_status "Adding component to component-docs..."

    # Add import
    sed -i "/import { ThemeSwitcherComponent } from/a\\
import { $component_class } from '$component_path';" projects/components/src/lib/component-docs/component-docs.component.ts

    # Add to imports array
    sed -i "/ThemeSwitcherComponent/a\\
    $component_class," projects/components/src/lib/component-docs/component-docs.component.ts

    # Add preview case
    local preview_case="                <!-- $component_class Examples -->
                <div *ngSwitchCase=\"'$component_id'\" class=\"${component_id}-examples\">
                  <$component_selector></$component_selector>
                </div>"

    sed -i "/<!-- Theme Switcher Examples -->/i\\
$preview_case" projects/components/src/lib/component-docs/component-docs.component.ts

    print_status "✓ Added to component-docs"
}

# Function to add component to public API
add_to_public_api() {
    local component_path="$1"

    print_status "Adding component to public API..."

    echo "export * from '$component_path';" >> projects/components/src/public-api.ts

    print_status "✓ Added to public API"
}

# Function to generate component files if they don't exist
generate_component_files() {
    local component_path="$1"
    local component_class="$2"
    local component_selector="$3"
    local component_name="$4"

    local full_path="projects/components/src/lib/$component_path"
    
    if [[ ! -f "$full_path.ts" ]]; then
        print_status "Component files don't exist. Generating basic component..."
        
        # Create directory if it doesn't exist
        mkdir -p "$(dirname "$full_path")"
        
        # Generate component TypeScript file
        cat > "$full_path.ts" << EOF
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '$component_selector',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="$component_selector">
      <h3>$component_name Component</h3>
      <p>This is a basic $component_name component.</p>
    </div>
  \`,
  styleUrls: ['./$component_selector.component.scss']
})
export class $component_class {
  @Input() variant: string = 'default';
}
EOF

        # Generate component SCSS file
        cat > "${full_path%/*}/$component_selector.component.scss" << EOF
.$component_selector {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }
}
EOF

        # Generate component HTML file
        cat > "${full_path%/*}/$component_selector.component.html" << EOF
<div class="$component_selector">
  <h3>$component_name Component</h3>
  <p>This is a basic $component_name component.</p>
  <p>Variant: {{ variant }}</p>
</div>
EOF

        # Generate component spec file
        cat > "${full_path%/*}/$component_selector.component.spec.ts" << EOF
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { $component_class } from './$component_selector.component';

describe('$component_class', () => {
  let component: $component_class;
  let fixture: ComponentFixture<$component_class>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [$component_class]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent($component_class);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
EOF

        print_status "✓ Generated basic component files"
    else
        print_status "Component files already exist, skipping generation"
    fi
}

# Main script
main() {
    print_header

    # Check if we're in the right directory
    if [[ ! -d "projects/components" ]]; then
        print_error "This script must be run from the root of the Angular workspace!"
        print_error "Make sure you're in the directory containing the 'projects' folder."
        exit 1
    fi

    # Collect component information
    echo "Let's add a new component to the documentation system!"
    echo

    # Component name
    while true; do
        read -p "Enter component name (e.g., 'Alert', 'Data Table'): " component_name
        if validate_input "$component_name"; then
            break
        fi
    done

    # Generate derived names
    component_id=$(to_kebab_case "$component_name")
    component_class="$(to_pascal_case "$component_name")Component"
    component_selector="ui-$component_id"
    component_camel=$(to_camel_case "$component_name")

    echo
    print_status "Generated names:"
    echo "  Component ID: $component_id"
    echo "  Component Class: $component_class"
    echo "  Component Selector: $component_selector"
    echo

    # Component description
    while true; do
        read -p "Enter component description: " component_description
        if validate_input "$component_description"; then
            break
        fi
    done

    # Component category
    echo
    echo "Available categories:"
    echo "  1. Form Controls"
    echo "  2. Layout"
    echo "  3. Display"
    echo "  4. Navigation"
    echo "  5. Utilities"
    echo "  6. Overlay"
    echo "  7. Custom"
    echo
    while true; do
        read -p "Select category (1-7) or enter custom: " category_choice
        case $category_choice in
            1) component_category="Form Controls"; break;;
            2) component_category="Layout"; break;;
            3) component_category="Display"; break;;
            4) component_category="Navigation"; break;;
            5) component_category="Utilities"; break;;
            6) component_category="Overlay"; break;;
            7) 
                read -p "Enter custom category: " component_category
                if validate_input "$component_category"; then
                    break
                fi
                ;;
            *) print_error "Invalid choice. Please select 1-7 or enter custom.";;
        esac
    done

    # Component path
    read -p "Enter component path (e.g., 'alert/alert.component' or press Enter for '$component_id/$component_selector.component'): " component_path
    if [[ -z "$component_path" ]]; then
        component_path="$component_id/$component_selector.component"
    fi

    # Example details
    echo
    read -p "Enter example title (default: 'Basic $component_name'): " example_title
    if [[ -z "$example_title" ]]; then
        example_title="Basic $component_name"
    fi

    read -p "Enter example description (default: 'Simple $component_name example'): " example_description
    if [[ -z "$example_description" ]]; then
        example_description="Simple $component_name example"
    fi

    # HTML example
    echo
    echo "Enter HTML example (press Enter twice when done):"
    html_example=""
    while IFS= read -r line; do
        if [[ -z "$line" ]]; then
            break
        fi
        html_example+="$line"$'\n'
    done

    if [[ -z "$html_example" ]]; then
        html_example="<$component_selector></$component_selector>"
    fi

    # TypeScript example
    echo
    echo "Enter TypeScript example (optional, press Enter twice when done):"
    ts_example=""
    while IFS= read -r line; do
        if [[ -z "$line" ]]; then
            break
        fi
        ts_example+="$line"$'\n'
    done

    if [[ -z "$ts_example" ]]; then
        ts_example="import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <$component_selector></$component_selector>
  \`
})
export class ExampleComponent {
  // Component logic here
}"
    fi

    # Summary
    echo
    print_header
    echo "Summary:"
    echo "  Name: $component_name"
    echo "  ID: $component_id"
    echo "  Class: $component_class"
    echo "  Selector: $component_selector"
    echo "  Category: $component_category"
    echo "  Path: $component_path"
    echo "  Description: $component_description"
    echo

    # Confirmation
    read -p "Proceed with adding this component? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_warning "Operation cancelled."
        exit 0
    fi

    # Check if component already exists
    if ! check_component_exists "$component_id"; then
        print_warning "Operation cancelled."
        exit 0
    fi

    # Create backups
    backup_files

    # Generate component files if needed
    generate_component_files "$component_path" "$component_class" "$component_selector" "$component_name"

    # Add to documentation service
    if ! add_to_documentation_service "$component_id" "$component_name" "$component_description" "$component_category" "$component_selector" "$example_title" "$example_description" "$html_example" "$ts_example"; then
        restore_backups
        print_error "Failed to add component to documentation service"
        exit 1
    fi

    # Add to component docs
    if ! add_to_component_docs "$component_class" "../$component_path" "$component_id" "$component_selector"; then
        restore_backups
        print_error "Failed to add component to component-docs"
        exit 1
    fi

    # Add to public API
    if ! add_to_public_api "./lib/$component_path"; then
        restore_backups
        print_error "Failed to add component to public API"
        exit 1
    fi

    # Clean up backups
    cleanup_backups

    # Success message
    echo
    print_status "✅ Component successfully added to documentation!"
    echo
    print_status "Next steps:"
    echo "  1. Review the generated files in projects/components/src/lib/$component_path"
    echo "  2. Customize the component implementation as needed"
    echo "  3. Run 'npm start' to see your component in the documentation"
    echo "  4. Navigate to your component in the sidebar to view the documentation"
    echo
    print_status "Files modified:"
    echo "  - projects/components/src/lib/services/documentation.service.ts"
    echo "  - projects/components/src/lib/component-docs/component-docs.component.ts"
    echo "  - projects/components/src/public-api.ts"
    if [[ ! -f "projects/components/src/lib/$component_path.ts" ]]; then
        echo "  - projects/components/src/lib/$component_path.ts (generated)"
        echo "  - projects/components/src/lib/${component_path%/*}/$component_selector.component.scss (generated)"
        echo "  - projects/components/src/lib/${component_path%/*}/$component_selector.component.html (generated)"
        echo "  - projects/components/src/lib/${component_path%/*}/$component_selector.component.spec.ts (generated)"
    fi
}

# Run the script
main "$@"
