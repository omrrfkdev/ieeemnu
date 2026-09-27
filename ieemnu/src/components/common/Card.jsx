/**
 * Card Component
 * Reusable card container with hover effects and variants
 */

import { forwardRef } from 'react';

/**
 * Card component for content containers
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.variant - Card style variant (default, elevated, bordered)
 * @param {boolean} props.hoverable - Whether card has hover effect
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Card component
 */
const Card = forwardRef(({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'rounded-lg transition-all duration-300';

  // Variant styles
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
  };

  // Hover styles
  const hoverStyles = hoverable
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  // Combine classes
  const cardClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header Component
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Card Body Component
 */
export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

/**
 * Card Footer Component
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export default Card;
