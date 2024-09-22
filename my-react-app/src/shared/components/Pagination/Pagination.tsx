import React from 'react';
import styles from './Pagination.module.css';
import { generatePageNumbers } from '../Pagination/paginationUtils'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage
}) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages); 

  return (
    <div className={styles.pagination}>
      <button onClick={onPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((number, index) =>
        number === '...' ? (
          <span key={`ellipsis-${index}`}>...</span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number as number)}
            className={currentPage === number ? styles.activePage : ''}
          >
            {number}
          </button>
        )
      )}

      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;