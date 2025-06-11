import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeComponent, CardComponent, DropdownComponent, UIButtonComponent } from 'components';
import { DataService } from '../../../components/src/lib/services/data.service';
import { DropdownItem } from '../../../components/src/lib/dropdown/testdrop/testdrop.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UIButtonComponent, CommonModule, CardComponent, BadgeComponent, DropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
  isSubmitting: boolean = false;

  onClick(event: Event): void {
    console.log('Button clicked:', event);
  }
  buttonFunction() {
    console.log('Button function called');
  }


  dataService = inject(DataService);

  // Add this method to handle logging
  handleCustomAction() {
    console.log('Custom action');
  }

  menuItems: DropdownItem[] = [
    { label: 'Home', icon: 'fas fa-home', routerLink: '/' },
    { label: 'Profile', icon: 'fas fa-user', routerLink: '/profile' },
    { label: 'Settings', icon: 'fas fa-cog', action: () => alert('Settings Clicked') },
    {
      label: 'More',
      icon: 'fas fa-ellipsis-h',
      submenu: [
        { label: 'Documentation', icon: 'fas fa-book', href: 'https://angular.io/docs' },
        { label: 'Contact Us', icon: 'fas fa-envelope', href: 'mailto:support@example.com' }
      ]
    }
  ];  
}
