import { useState, useMemo, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling pagination with performance optimizations
 * @param {Array} data - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 6)
 * @returns {Object} Pagination state and handlers
 */
const usePagination = (data, itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  // Get current page items
  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Get next page items for preloading
  const nextPageItems = useMemo(() => {
    if (currentPage >= totalPages) return [];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage, totalPages]);

  // Get previous page items for preloading
  const previousPageItems = useMemo(() => {
    if (currentPage <= 1) return [];
    const startIndex = (currentPage - 2) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Reset to page 1 when data changes significantly
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Handle page change with callback
  const handlePageChange = useCallback((event, page) => {
    setCurrentPage(page);
  }, []);

  // Go to specific page
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Go to next page
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Go to previous page
  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  // Go to first page
  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Go to last page
  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  // Reset to page 1
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    currentPageItems,
    nextPageItems,
    previousPageItems,
    itemsPerPage,
    handlePageChange,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export default usePagination;