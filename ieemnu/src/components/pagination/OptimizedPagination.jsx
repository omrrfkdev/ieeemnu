import { memo } from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

/**
 * Optimized Pagination Component with Material-UI
 * Features: Responsive sizing, custom styling, accessibility support
 * 
 * @param {Object} props - Component props
 * @param {number} props.count - Total number of pages
 * @param {number} props.page - Current page number
 * @param {Function} props.onChange - Page change handler
 * @param {string} props.size - Component size (small, medium, large)
 * @param {boolean} props.showFirstButton - Show first page button
 * @param {boolean} props.showLastButton - Show last page button
 * @param {boolean} props.disabled - Disable pagination
 * @param {string} props.color - Color variant
 * @param {string} props.variant - Variant style
 * @param {string} props.shape - Shape of pagination items (circular, rounded)
 * @returns {JSX.Element} Optimized pagination component
 */
const OptimizedPagination = memo(({
  count,
  page,
  onChange,
  size = 'medium',
  showFirstButton = true,
  showLastButton = true,
  disabled = false,
  color = 'primary',
  variant = 'outlined',
  shape = 'rounded',
  className = '',
  ...props
}) => {
  const theme = useTheme();

  const isSmallScreen = window.innerWidth < 640;

  return (
    <Stack spacing={2} className={className}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        variant={variant}
        color={color}
        size={isSmallScreen ? 'small' : size}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        disabled={disabled}
        shape={shape}
        sx={{
          '& .MuiPaginationItem-root': {
            fontWeight: 500,
            transition: 'all 0.2s ease-in-out',
            color: theme.palette.text.primary,
            '&:hover:not(.Mui-disabled):not(.Mui-selected)': {
              backgroundColor: 'rgba(0, 98, 155, 0.08)',
              transform: 'scale(1.1)',
            },
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #00629B 0%, #00A9CE 100%)',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 98, 155, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #005085 0%, #0095B8 100%)',
                transform: 'scale(1.1)',
              },
            },
            '&.Mui-disabled': {
              opacity: 0.5,
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: theme.palette.text.primary,
            fontWeight: 'bold',
          },
          '& .MuiPaginationItem-firstLast': {
            fontWeight: 'bold',
          },
          '& .MuiPaginationItem-previousNext': {
            fontWeight: 'bold',
          },
        }}
        {...props}
      />
    </Stack>
  );
});

OptimizedPagination.displayName = 'OptimizedPagination';

export default OptimizedPagination;