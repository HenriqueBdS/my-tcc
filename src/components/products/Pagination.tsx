interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtonsToShow = 3;
    const halfButtons = Math.floor(maxButtonsToShow / 2);

    let start = Math.max(1, currentPage - halfButtons);
    let end = Math.min(totalPages, currentPage + halfButtons);

    if (end - start + 1 < maxButtonsToShow) {
      if (currentPage <= halfButtons) {
        end = Math.min(totalPages, maxButtonsToShow);
      } else if (currentPage > totalPages - halfButtons) {
        start = Math.max(1, totalPages - maxButtonsToShow + 1);
      }
    }

    if (totalPages <= maxButtonsToShow) {
      start = 1;
      end = totalPages;
    }

    if (start > 1) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
        >
          1
        </button>
      );
      if (start > 2) {
        pageButtons.push(
          <span key="ellipsis-start" className="text-white">
            ...
          </span>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      const isActive = i === currentPage;
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
            isActive
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageButtons.push(
          <span key="ellipsis-end" className="text-white">
            ...
          </span>
        );
      }
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-center mt-8 mb-8">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
          aria-label="Página Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {renderPageButtons()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
          aria-label="Próxima Página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
