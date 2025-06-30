export type ThemeName = 'light' | 'dark' | 'halloween' | 'july4th' | 'breast-cancer';

export interface Theme {
  name: ThemeName;
  label: string;
  icon: string;
}

export const AVAILABLE_THEMES: Theme[] = [
  {
    name: 'light',
    label: 'Light Theme',
    icon: 'bi bi-sun'
  },
  {
    name: 'dark',
    label: 'Dark Theme',
    icon: 'bi bi-moon'
  },
  {
    name: 'halloween',
    label: 'Halloween',
    icon: 'bi bi-moon-stars'
  },
  {
    name: 'july4th',
    label: '4th of July',
    icon: 'bi bi-stars'
  },
  {
    name: 'breast-cancer',
    label: 'Breast Cancer Awareness',
    icon: 'bi bi-heart'
  }
];

export const DEFAULT_THEME: ThemeName = 'light';
