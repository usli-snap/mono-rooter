import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../../../../../components/src/lib/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1>Settings</h1>
        <p class="subtitle">Manage your application preferences and configuration</p>
      </div>
      
      <div class="settings-content">
        <div class="settings-section">
          <h2>Theme Preferences</h2>
          <p class="section-description">Choose your preferred theme and appearance settings</p>
          
          <div class="theme-settings">
            <div class="setting-group">
              <label class="setting-label">Theme Selection</label>
              <div class="theme-switcher-wrapper">
                <lib-theme-switcher></lib-theme-switcher>
              </div>
              <p class="setting-help">Select from available themes including light, dark, and seasonal options</p>
            </div>
            
            <div class="setting-group">
              <label class="setting-label">Auto Theme</label>
              <div class="toggle-wrapper">
                <input type="checkbox" id="auto-theme" class="toggle-input">
                <label for="auto-theme" class="toggle-label">
                  <span class="toggle-slider"></span>
                </label>
                <span class="toggle-text">Follow system preference</span>
              </div>
              <p class="setting-help">Automatically switch between light and dark themes based on your system settings</p>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h2>Display Settings</h2>
          <p class="section-description">Customize how content is displayed</p>
          
          <div class="setting-group">
            <label class="setting-label">Sidebar Behavior</label>
            <select class="setting-select">
              <option value="auto">Auto-collapse on mobile</option>
              <option value="always">Always expanded</option>
              <option value="collapsed">Always collapsed</option>
            </select>
            <p class="setting-help">Control how the sidebar behaves across different screen sizes</p>
          </div>
          
          <div class="setting-group">
            <label class="setting-label">Animation Speed</label>
            <div class="slider-wrapper">
              <input type="range" min="0.1" max="1" step="0.1" value="0.3" class="setting-slider">
              <div class="slider-labels">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
            <p class="setting-help">Adjust the speed of UI animations and transitions</p>
          </div>
        </div>
        
        <div class="settings-section">
          <h2>Search Settings</h2>
          <p class="section-description">Configure search behavior and preferences</p>
          
          <div class="setting-group">
            <label class="setting-label">Search Results</label>
            <select class="setting-select">
              <option value="8">8 results</option>
              <option value="12">12 results</option>
              <option value="16">16 results</option>
              <option value="20">20 results</option>
            </select>
            <p class="setting-help">Maximum number of search results to display</p>
          </div>
          
          <div class="setting-group">
            <div class="toggle-wrapper">
              <input type="checkbox" id="search-history" class="toggle-input" checked>
              <label for="search-history" class="toggle-label">
                <span class="toggle-slider"></span>
              </label>
              <span class="toggle-text">Save search history</span>
            </div>
            <p class="setting-help">Remember your recent searches for quick access</p>
          </div>
        </div>
        
        <div class="settings-section">
          <h2>Privacy & Data</h2>
          <p class="section-description">Control your privacy and data preferences</p>
          
          <div class="setting-group">
            <div class="toggle-wrapper">
              <input type="checkbox" id="analytics" class="toggle-input">
              <label for="analytics" class="toggle-label">
                <span class="toggle-slider"></span>
              </label>
              <span class="toggle-text">Share usage analytics</span>
            </div>
            <p class="setting-help">Help improve the application by sharing anonymous usage data</p>
          </div>
          
          <div class="setting-group">
            <div class="toggle-wrapper">
              <input type="checkbox" id="crash-reports" class="toggle-input" checked>
              <label for="crash-reports" class="toggle-label">
                <span class="toggle-slider"></span>
              </label>
              <span class="toggle-text">Send crash reports</span>
            </div>
            <p class="setting-help">Automatically send crash reports to help fix issues</p>
          </div>
        </div>
        
        <div class="settings-actions">
          <button class="btn-primary">Save Changes</button>
          <button class="btn-secondary">Reset to Defaults</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .settings-header {
      margin-bottom: 2rem;
    }

    .settings-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: var(--text-secondary);
      margin: 0;
    }

    .settings-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .settings-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .settings-section h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .section-description {
      color: var(--text-secondary);
      margin: 0 0 1.5rem 0;
      font-size: 0.875rem;
    }

    .theme-settings {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .setting-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .theme-switcher-wrapper {
      align-self: flex-start;
    }

    .setting-select {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
      max-width: 200px;
    }

    .setting-help {
      font-size: 0.75rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .toggle-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .toggle-input {
      display: none;
    }

    .toggle-label {
      position: relative;
      width: 44px;
      height: 24px;
      background: var(--border-color);
      border-radius: 12px;
      cursor: pointer;
      transition: var(--transition);
    }

    .toggle-slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: var(--white);
      border-radius: 50%;
      transition: var(--transition);
    }

    .toggle-input:checked + .toggle-label {
      background: var(--primary-color);
    }

    .toggle-input:checked + .toggle-label .toggle-slider {
      transform: translateX(20px);
    }

    .toggle-text {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 200px;
    }

    .setting-slider {
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: var(--border-color);
      outline: none;
      cursor: pointer;
    }

    .setting-slider::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
    }

    .setting-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
      border: none;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .settings-actions {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .btn-primary {
      background: var(--primary-color);
      color: var(--white);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-primary:hover {
      opacity: 0.9;
    }

    .btn-secondary {
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-secondary:hover {
      background: var(--bg-primary);
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .settings-container {
        padding: 1rem;
      }

      .settings-actions {
        flex-direction: column;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class SettingsComponent {

}
