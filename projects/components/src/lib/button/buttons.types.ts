export interface ButtonParams {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'both' | 'end';
  addedClasses?: string;
  ariaLabel?: string;
  loading?: boolean;
  loadingText?: string;
}
