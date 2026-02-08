import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePrevClick = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages - 1) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        let pageNumbers = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 0);
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <Link
                        to={`#`}
                        onClick={() => handlePageChange(i)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === i
                            ? 'border rounded-lg dark:text-white mx-2'
                            : `text-gray-500 hover:border  hover:text-gray-700 dark:text-gray-400
                                hover:rounded-lg dark:hover:text-white`
                            }`}
                    >
                        {i + 1}
                    </Link>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-14">
            <nav aria-label="">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <Link
                            to={`#`}
                            onClick={handlePrevClick}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 rounded-s-lg
                                hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                                dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <MdKeyboardArrowRight className="text-2xl font-bold" />
                        </Link>
                    </li>
                    {renderPageNumbers()}
                    <li>
                        <Link
                            to={`#`}
                            onClick={handleNextClick}
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 rounded-e-lg
                                hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                                dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <MdKeyboardArrowLeft className="text-2xl font-bold" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
