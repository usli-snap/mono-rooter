import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeName, DEFAULT_THEME, AVAILABLE_THEMES, Theme } from '../themes/theme.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'selected-theme';
  private currentThemeSubject = new BehaviorSubject<ThemeName>(DEFAULT_THEME);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  /**
   * Get the current theme as an observable
   */
  get currentTheme$(): Observable<ThemeName> {
    return this.currentThemeSubject.asObservable();
  }

  /**
   * Get the current theme value
   */
  get currentTheme(): ThemeName {
    return this.currentThemeSubject.value;
  }

  /**
   * Get all available themes
   */
  get availableThemes(): Theme[] {
    return AVAILABLE_THEMES;
  }

  /**
   * Set a new theme
   */
  setTheme(theme: ThemeName): void {
    if (this.isValidTheme(theme)) {
      this.currentThemeSubject.next(theme);
      this.applyTheme(theme);
      this.saveThemeToStorage(theme);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleLightDark(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get theme details by name
   */
  getThemeDetails(themeName: ThemeName): Theme | undefined {
    return AVAILABLE_THEMES.find(theme => theme.name === themeName);
  }

  /**
   * Check if a theme name is valid
   */
  private isValidTheme(theme: string): theme is ThemeName {
    return AVAILABLE_THEMES.some(t => t.name === theme);
  }

  /**
   * Initialize theme on service creation
   */
  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = this.getThemeFromStorage();
      const preferredTheme = savedTheme || this.getSystemPreference();
      this.setTheme(preferredTheme);
    }
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: ThemeName): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      
      // Remove all existing theme classes
      AVAILABLE_THEMES.forEach(t => {
        body.removeAttribute(`data-theme`);
      });
      
      // Add new theme class
      body.setAttribute('data-theme', theme);
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemeToStorage(theme: ThemeName): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  }

  /**
   * Get theme preference from localStorage
   */
  private getThemeFromStorage(): ThemeName | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
        return savedTheme && this.isValidTheme(savedTheme) ? savedTheme : null;
      } catch (error) {
        console.warn('Failed to read theme from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Get system theme preference
   */
  private getSystemPreference(): ThemeName {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return DEFAULT_THEME;
  }

  /**
   * Update meta theme-color for mobile browsers
   */
  private updateMetaThemeColor(theme: ThemeName): void {
    if (isPlatformBrowser(this.platformId)) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        const colors = {
          light: '#ffffff',
          dark: '#212529',
          halloween: '#1a0a1a',
          july4th: '#ffffff',
          'breast-cancer': '#ffffff'
        };
        metaThemeColor.setAttribute('content', colors[theme]);
      }
    }
  }
}
