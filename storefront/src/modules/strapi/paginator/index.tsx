import React from 'react';
import ThickChevron from '@modules/common/icons/thick-chevron';

interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <div className="flex gap-4 my-4 justify-center">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-ui-fg-base text-ui-bg-base rounded hover:bg-ui-fg-subtle transition duration-300 disabled:opacity-50"
      >
        <ThickChevron direction='left'/>
      </button>

      {/* Page Number Buttons */}
      {pageCount > 1 && Array.from({ length: pageCount }).map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === pageNum
                ? "bg-ui-fg-base text-ui-bg-base"
                : "bg-ui-bg-base text-ui-fg-base hover:bg-ui-fg-subtle"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
        className="px-4 py-2 bg-ui-fg-base text-ui-bg-base rounded hover:bg-ui-fg-subtle transition duration-300 disabled:opacity-50"
      >
          <ThickChevron />
      </button>
    </div>
  );
};

export default Paginator;
