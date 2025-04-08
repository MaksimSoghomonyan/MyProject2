import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first page, last page, current page, and one page before and after current
    const pageNumbers = new Set<number>();

    // Always add first and last page
    pageNumbers.add(1);
    if (totalPages > 1) pageNumbers.add(totalPages);

    // Add current page and one before and after
    pageNumbers.add(currentPage);
    if (currentPage > 1) pageNumbers.add(currentPage - 1);
    if (currentPage < totalPages) pageNumbers.add(currentPage + 1);

    return Array.from(pageNumbers).sort((a, b) => a - b);
  };

  const pageNumbers = generatePagination();

  if (totalPages <= 1) return null;

  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, i) => {
          // If there's a gap between numbers, show ellipsis
          const previousNumber = pageNumbers[i - 1];
          if (previousNumber && pageNumber - previousNumber > 1) {
            return (
              <PaginationItem key={`ellipsis-${pageNumber}`}>
                <span className="px-4 py-2">...</span>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
