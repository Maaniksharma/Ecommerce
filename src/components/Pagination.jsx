import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page >= 1 && page <= totalPages
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded bg-blue-500 text-white"
      >
        <ArrowLeftIcon />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-2 rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages - 1 && <span>...</span>}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded bg-blue-500 text-white"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

export default Pagination;
