/**
 * Button Component
 * Reusable button with multiple variants and sizes
 * Supports icons, loading states, and full accessibility
 * Can render as a button or any other component (e.g., Link)
 */

import { forwardRef } from 'react';

/**
 * Button component with multiple style variants
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {React.ElementType} props.as - Component to render as (default: 'button')
 * @returns {JSX.Element} Button component
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  as: Component = 'button',
  type = 'button',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variants = {
    primary: 'bg-ieee-blue text-white hover:bg-ieee-blue-dark focus:ring-ieee-blue dark:bg-ieee-blue-light',
    secondary: 'bg-accent-teal text-white hover:bg-accent-teal/90 focus:ring-accent-teal',
    outline: 'border-2 border-ieee-blue text-ieee-blue hover:bg-ieee-blue hover:text-white focus:ring-ieee-blue dark:border-ieee-blue-light dark:text-ieee-blue-light',
    ghost: 'text-ieee-blue hover:bg-ieee-blue/10 focus:ring-ieee-blue dark:text-ieee-blue-light',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  // Combine classes
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Content to render
  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  // If rendering as button, include type and disabled
  const buttonProps = Component === 'button' ? { type, disabled: disabled || loading } : {};

  return (
    <Component
      ref={ref}
      className={buttonClasses}
      onClick={onClick}
      aria-busy={loading}
      {...buttonProps}
      {...props}
    >
      {content}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
