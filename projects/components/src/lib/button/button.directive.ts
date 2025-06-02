import {
  Directive, Input, Output, EventEmitter,
  HostBinding, HostListener
} from '@angular/core';
import { ButtonParams, ButtonVariant, ButtonSize } from './button-params';

@Directive({
  selector: 'button[uiButton]',
  standalone: true
})
export class UiButtonDirective {

  /* ---------- Inputs ---------- */
  @Input() variant:  ButtonVariant = 'primary';
  @Input() size:     ButtonSize    = 'md';
  @Input() type:     'button' | 'submit' | 'reset' = 'button';
  @Input() disabled  = false;
  @Input() iconClass = '';
  @Input() iconPosition: 'before' | 'after' = 'before';
  @Input() extraClass = '';
  @Input('ariaLabel') ariaLabel = '';

  /* ---------- Output ---------- */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /* ---------- Host bindings (all on the <button>) ---------- */
  @HostBinding('attr.type')        get hostType()    { return this.type; }
  @HostBinding('disabled')         get hostDisabled() { return this.disabled || null; }
  @HostBinding('attr.aria-label')  get hostAria()    { return this.ariaLabel || null; }
  @HostBinding('class')            get hostClass()   {
    const v  = this.variant;
    const sz = this.size;
    return `ui-btn ui-btn--${v} ui-btn--${sz} ${this.extraClass}`.trim();
  }

  /* ---------- Event forwarding ---------- */
  @HostListener('click', ['$event'])
  onHostClick(ev: MouseEvent) {
    if (!this.disabled) this.clicked.emit(ev);
  }

  /* ---------- Convenience for object binding (optional) ---------- */
  @Input()
  set params(p: ButtonParams | null) {
    if (!p) return;
    ({ variant: this.variant,
       size: this.size,
       type: this.type,
       disabled: this.disabled,
       iconClass: this.iconClass,
       iconPosition: this.iconPosition,
       extraClass: this.extraClass,
       ariaLabel: this.ariaLabel } = { ...this, ...p });
  }
}
