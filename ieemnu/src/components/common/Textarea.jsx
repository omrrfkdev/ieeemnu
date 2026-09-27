/**
 * Textarea Component
 * Reusable textarea for forms with label and error states
 */

import { forwardRef } from 'react';

/**
 * Textarea component for forms
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Textarea label
 * @param {string} props.error - Error message
 * @param {string} props.placeholder - Placeholder text
 * @param {number} props.rows - Number of rows
 * @param {boolean} props.required - Whether textarea is required
 * @param {boolean} props.disabled - Whether textarea is disabled
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Textarea component
 */
const Textarea = forwardRef(({
  label,
  error,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const baseStyles = 'w-full px-4 py-2 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';

  const stateStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 dark:border-gray-600 focus:border-ieee-blue focus:ring-ieee-blue dark:bg-gray-800 dark:text-white';

  const textareaClasses = `${baseStyles} ${stateStyles} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
