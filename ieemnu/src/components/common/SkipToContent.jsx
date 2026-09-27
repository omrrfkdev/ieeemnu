/**
 * Skip to Content Link
 * Accessibility feature for keyboard navigation
 * Allows users to skip navigation and jump directly to main content
 */

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-ieee-blue focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ieee-blue transition-all duration-200"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
