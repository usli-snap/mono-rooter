import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { ThemeName, Theme } from '../themes/theme.types';
import { DropdownComponent } from '../dropdown/dropdown.component';

export interface ThemeDropdownItem {
  text: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'lib-theme-switcher',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  template: `
    <ui-dropdown
      [label]="currentThemeLabel"
      [items]="themeItems"
      [showIcons]="true">
    </ui-dropdown>
  `,
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentThemeLabel = 'Light Theme';
  themeItems: ThemeDropdownItem[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.setupThemeItems();
    this.subscribeToThemeChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupThemeItems(): void {
    this.themeItems = this.themeService.availableThemes.map(theme => ({
      text: theme.label,
      icon: theme.icon,
      action: () => this.selectTheme(theme.name)
    }));
  }

  private subscribeToThemeChanges(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentTheme => {
        this.updateCurrentThemeDisplay(currentTheme);
      });
  }

  private updateCurrentThemeDisplay(themeName: ThemeName): void {
    const themeDetails = this.themeService.getThemeDetails(themeName);
    if (themeDetails) {
      this.currentThemeLabel = themeDetails.label;
    }
  }

  private selectTheme(themeName: ThemeName): void {
    this.themeService.setTheme(themeName);
  }
}
