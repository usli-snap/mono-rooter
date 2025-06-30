import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchData: SearchResult[] = [
    {
      id: 'button',
      title: 'Button Component',
      description: 'Interactive button with various styles and states',
      category: 'Components',
      url: '/components/button'
    },
    {
      id: 'card',
      title: 'Card Component',
      description: 'Container for displaying content in a structured format',
      category: 'Components',
      url: '/components/card'
    },
    {
      id: 'badge',
      title: 'Badge Component',
      description: 'Small status indicators and labels',
      category: 'Components',
      url: '/components/badge'
    },
    {
      id: 'dropdown',
      title: 'Dropdown Component',
      description: 'Menu component with selectable options',
      category: 'Components',
      url: '/components/dropdown'
    },
    {
      id: 'theme-switcher',
      title: 'Theme Switcher',
      description: 'Component for switching between different themes',
      category: 'Components',
      url: '/components/theme-switcher'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Main dashboard overview',
      category: 'Pages',
      url: '/dashboard'
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'User profile and account information',
      category: 'Pages',
      url: '/profile'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Application settings and preferences',
      category: 'Pages',
      url: '/settings'
    },
    {
      id: 'help',
      title: 'Help',
      description: 'Help documentation and support',
      category: 'Pages',
      url: '/help'
    }
  ];

  private searchSubject = new BehaviorSubject<string>('');

  search(query: string): Observable<SearchResult[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    const lowercaseQuery = query.toLowerCase();
    const results = this.searchData.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );

    return of(results).pipe(
      map(items => items.slice(0, 8)) // Limit to 8 results
    );
  }

  getSearchObservable(): Observable<SearchResult[]> {
    return this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.search(query))
    );
  }

  updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }
}
