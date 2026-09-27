import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';

const PAGE_NAMES = {
  '/': 'Home',
  '/events': 'Events',
  '/board': 'Board',
  '/committees': 'Committees',
  '/membership': 'Membership',
  '/faq': 'FAQ',
  '/registration': 'Registration',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
};

const Breadcrumb = () => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = segments.map((_, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const name = PAGE_NAMES[path] || segments[index].charAt(0).toUpperCase() + segments[index].slice(1);
    return { path, name, isLast: index === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-ieee-blue dark:hover:text-ieee-blue-light transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue rounded"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" aria-hidden="true" />
            {crumb.isLast ? (
              <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-gray-500 dark:text-gray-400 hover:text-ieee-blue dark:hover:text-ieee-blue-light transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue rounded"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
