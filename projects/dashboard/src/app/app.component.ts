import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIButtonComponent } from '@components/lib';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UIButtonComponent, CommonModule],
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
}
