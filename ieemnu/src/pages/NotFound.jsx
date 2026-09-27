/**
 * 404 Not Found Page
 * Displayed when user navigates to a non-existent route
 */

import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

/**
 * 404 Not Found page component
 * 
 * @returns {JSX.Element} 404 page
 */
const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-ieee-blue dark:text-ieee-blue-light">
              404
            </h1>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
            >
              Go to Homepage
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Go Back
            </Button>
          </div>

          {/* Decorative Element */}
          <div className="mt-16">
            <div className="inline-block p-8 bg-gray-100 dark:bg-gray-800 rounded-full">
              <svg
                className="w-32 h-32 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
