import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationService } from '../services/documentation.service';

@Component({
  selector: 'lib-code-copy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-copy-container">
      <div class="code-header">
        <span class="language-label">{{ language }}</span>
        <button 
          class="copy-btn"
          (click)="copyToClipboard()"
          [class.copied]="copied">
          <i class="bi" [class.bi-clipboard]="!copied" [class.bi-check2]="copied"></i>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <pre class="code-block"><code 
        [innerHTML]="highlightedCode"
        [class]="'language-' + language">
      </code></pre>
    </div>
  `,
  styleUrls: ['./code-copy.component.scss']
})
export class CodeCopyComponent {
  @Input() code: string = '';
  @Input() language: string = 'typescript';
  
  copied = false;
  highlightedCode = '';
  
  private docService = inject(DocumentationService);

  ngOnInit() {
    this.highlightCode();
  }

  ngOnChanges() {
    this.highlightCode();
  }

  private highlightCode() {
    this.highlightedCode = this.docService.highlightCode(this.code, this.language);
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(this.code);
    }
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  }
}
