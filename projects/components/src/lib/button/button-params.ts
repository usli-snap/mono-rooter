export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonParams {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  iconClass?: string;
  iconPosition?: 'before' | 'after';
  extraClass?: string;
  ariaLabel?: string;
}
