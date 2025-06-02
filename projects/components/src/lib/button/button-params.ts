export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'outline' | 'link';
export type ButtonSize    = 'xs' |'sm' | 'md' | 'lg';

export interface ButtonParams {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  iconClass?: string;
  iconPosition?: 'before' | 'after' | 'beforeAfter';
  extraClass?: string;
  ariaLabel?: string;
}
