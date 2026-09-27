# Contributing to IEEE Student Branch Website

Thank you for your interest in contributing to our IEEE Student Branch website! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ieee-web-react.git
   cd ieee-web-react
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Running the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Coding Standards

### JavaScript/React

- Use **functional components** with hooks
- Follow **React best practices**
- Use **JSDoc comments** for all functions and components
- Keep components **small and focused** (single responsibility)
- Use **meaningful variable and function names**
- Avoid **deep nesting** (max 3 levels)

### Example Component Structure

```jsx
/**
 * ComponentName
 * Brief description of what the component does
 */

import { useState } from 'react';

/**
 * Component description
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @returns {JSX.Element} Component
 */
const ComponentName = ({ title }) => {
  const [state, setState] = useState(initialValue);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** approach
- Ensure **dark mode** compatibility
- Test on **multiple screen sizes**
- Use **semantic class names** when custom CSS is needed

### File Organization

```
src/
├── components/
│   ├── common/         # Reusable components
│   ├── layout/         # Layout components
│   └── sections/       # Page-specific sections
├── pages/              # Route pages
├── hooks/              # Custom hooks
├── context/            # React Context
├── constants/          # Constants and config
└── utils/              # Helper functions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.jsx`, `EventCard.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useTheme.js`, `useScrollAnimation.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`, `validateEmail.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_ITEMS`)

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```
feat(events): add event registration form

fix(header): resolve mobile menu overflow issue

docs(readme): update installation instructions

style(button): improve button hover animations
```

## Pull Request Process

1. **Update documentation** if you've changed APIs or added features
2. **Test your changes** thoroughly:
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test responsive design on mobile, tablet, and desktop
   - Test dark mode functionality
   - Check accessibility with screen readers
3. **Run linter** and fix any issues:
   ```bash
   npm run lint
   ```
4. **Update the README.md** if needed
5. **Create a pull request** with a clear title and description
6. **Link any related issues** in the PR description
7. **Wait for review** and address any feedback

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile devices
- [ ] Tested dark mode
- [ ] Tested accessibility

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #issue_number
```

## Reporting Bugs

### Before Submitting a Bug Report

- Check the **existing issues** to avoid duplicates
- Try to **reproduce the bug** in the latest version
- Collect **relevant information** (browser, OS, steps to reproduce)

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## Suggesting Features

### Before Submitting a Feature Request

- Check if the feature **already exists**
- Check if someone has **already suggested** it
- Consider if it **aligns with project goals**

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or screenshots.
```

## Code Review Process

### What We Look For

- **Code quality**: Clean, readable, maintainable code
- **Performance**: Efficient algorithms and rendering
- **Accessibility**: WCAG AA compliance
- **Responsive design**: Works on all screen sizes
- **Browser compatibility**: Works on modern browsers
- **Documentation**: Clear comments and documentation
- **Testing**: Adequate test coverage

### Review Timeline

- Initial review within **2-3 days**
- Follow-up reviews within **1-2 days**
- Merging after **approval from maintainers**

## Development Tips

### Performance

- Use `React.memo()` for expensive components
- Implement lazy loading for images
- Use code splitting for routes
- Optimize bundle size

### Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast

### Responsive Design

- Test on multiple devices
- Use Tailwind's responsive utilities
- Consider touch targets on mobile
- Test landscape and portrait orientations

## Questions?

If you have questions, feel free to:
- Open an issue with the `question` label
- Contact the maintainers at ieee@university.edu
- Join our Discord/Slack community

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the IEEE Student Branch website! 🎉
