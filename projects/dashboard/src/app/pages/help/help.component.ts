import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="help-container">
      <div class="help-header">
        <h1>Help & Support</h1>
        <p class="subtitle">Find answers to common questions and get support</p>
      </div>
      
      <div class="help-content">
        <div class="search-section">
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Search help articles..." class="search-input">
          </div>
        </div>
        
        <div class="help-sections">
          <div class="help-section">
            <h2>Getting Started</h2>
            <div class="help-items">
              <div class="help-item">
                <div class="help-icon">
                  <i class="bi bi-play-circle"></i>
                </div>
                <div class="help-content-item">
                  <h3>Quick Start Guide</h3>
                  <p>Learn the basics of using the component library and dashboard</p>
                  <a href="#" class="help-link">Read more →</a>
                </div>
              </div>
              
              <div class="help-item">
                <div class="help-icon">
                  <i class="bi bi-palette"></i>
                </div>
                <div class="help-content-item">
                  <h3>Customizing Themes</h3>
                  <p>How to switch between themes and customize the appearance</p>
                  <a href="#" class="help-link">Read more →</a>
                </div>
              </div>
              
              <div class="help-item">
                <div class="help-icon">
                  <i class="bi bi-grid"></i>
                </div>
                <div class="help-content-item">
                  <h3>Using Components</h3>
                  <p>Guide to implementing and customizing UI components</p>
                  <a href="#" class="help-link">Read more →</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
              <div class="faq-item">
                <button class="faq-question" (click)="toggleFaq(0)">
                  <span>How do I change the theme?</span>
                  <i class="bi" [class.bi-chevron-down]="!expandedFaq[0]" [class.bi-chevron-up]="expandedFaq[0]"></i>
                </button>
                <div class="faq-answer" [class.expanded]="expandedFaq[0]">
                  <p>You can change the theme by clicking on the theme switcher in the top-right corner or by going to Settings > Theme Preferences.</p>
                </div>
              </div>
              
              <div class="faq-item">
                <button class="faq-question" (click)="toggleFaq(1)">
                  <span>How do I collapse the sidebar?</span>
                  <i class="bi" [class.bi-chevron-down]="!expandedFaq[1]" [class.bi-chevron-up]="expandedFaq[1]"></i>
                </button>
                <div class="faq-answer" [class.expanded]="expandedFaq[1]">
                  <p>Click the toggle button in the sidebar header to collapse or expand it. You can also use the hamburger menu in the main header.</p>
                </div>
              </div>
              
              <div class="faq-item">
                <button class="faq-question" (click)="toggleFaq(2)">
                  <span>How does the search feature work?</span>
                  <i class="bi" [class.bi-chevron-down]="!expandedFaq[2]" [class.bi-chevron-up]="expandedFaq[2]"></i>
                </button>
                <div class="faq-answer" [class.expanded]="expandedFaq[2]">
                  <p>The search feature provides typeahead suggestions as you type. It searches through components, pages, and documentation content.</p>
                </div>
              </div>
              
              <div class="faq-item">
                <button class="faq-question" (click)="toggleFaq(3)">
                  <span>Can I customize the component styles?</span>
                  <i class="bi" [class.bi-chevron-down]="!expandedFaq[3]" [class.bi-chevron-up]="expandedFaq[3]"></i>
                </button>
                <div class="faq-answer" [class.expanded]="expandedFaq[3]">
                  <p>Yes, all components use CSS custom properties (variables) that can be overridden to match your design system.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h2>Contact Support</h2>
            <div class="contact-options">
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-envelope"></i>
                </div>
                <div class="contact-info">
                  <h3>Email Support</h3>
                  <p>Get help via email within 24 hours</p>
                  <a href="mailto:support&#64;example.com" class="contact-link">support&#64;example.com</a>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-chat-dots"></i>
                </div>
                <div class="contact-info">
                  <h3>Live Chat</h3>
                  <p>Chat with our support team in real-time</p>
                  <button class="contact-button">Start Chat</button>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-book"></i>
                </div>
                <div class="contact-info">
                  <h3>Documentation</h3>
                  <p>Browse our comprehensive documentation</p>
                  <a href="#" class="contact-link">View Docs</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h2>System Information</h2>
            <div class="system-info">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Version:</span>
                  <span class="info-value">1.0.0</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Last Updated:</span>
                  <span class="info-value">{{ getCurrentDate() }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Browser:</span>
                  <span class="info-value">{{ getBrowserInfo() }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Screen Resolution:</span>
                  <span class="info-value">{{ getScreenResolution() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .help-header {
      margin-bottom: 2rem;
    }

    .help-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: var(--text-secondary);
      margin: 0;
    }

    .search-section {
      margin-bottom: 2rem;
    }

    .search-box {
      position: relative;
      max-width: 400px;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .search-input:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .help-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .help-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .help-section h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .help-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .help-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
      transition: var(--transition);
    }

    .help-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .help-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .help-content-item h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .help-content-item p {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .help-link {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .help-link:hover {
      text-decoration: underline;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .faq-item {
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      padding: 1rem;
      background: var(--bg-primary);
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      color: var(--text-primary);
      font-weight: 500;
      transition: var(--transition);
    }

    .faq-question:hover {
      background: var(--bg-secondary);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      background: var(--bg-secondary);
    }

    .faq-answer.expanded {
      max-height: 200px;
    }

    .faq-answer p {
      padding: 1rem;
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .contact-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .contact-info h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .contact-info p {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .contact-link {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    .contact-button {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .contact-button:hover {
      opacity: 0.9;
    }

    .system-info {
      background: var(--bg-primary);
      border-radius: 8px;
      padding: 1rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
    }

    .info-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .info-value {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .help-container {
        padding: 1rem;
      }

      .contact-options {
        grid-template-columns: 1fr;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .help-item {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class HelpComponent {
  expandedFaq: boolean[] = [false, false, false, false];

  toggleFaq(index: number): void {
    this.expandedFaq[index] = !this.expandedFaq[index];
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  getBrowserInfo(): string {
    return navigator.userAgent.split(' ')[0] || 'Unknown';
  }

  getScreenResolution(): string {
    return `${screen.width}x${screen.height}`;
  }
}
