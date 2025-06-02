import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButtonDirective } from '@components/lib';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UiButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';

  onClick(event: Event): void {
    console.log('Button clicked:', event);
  }
}
