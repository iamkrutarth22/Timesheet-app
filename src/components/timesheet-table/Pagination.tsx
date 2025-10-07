'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterContext } from "@/context/FilterContext";
import { useContext } from "react";

export default function PaginationComponent() {
  const totalPages = 5;
  const { filter, changePageNumber, changeNumberOfRows } = useContext(FilterContext);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageClick = (page: number) => {
    changePageNumber(page);
  };

  const handlePrevious = () => {
    if (filter.pageNumber > 1) changePageNumber(filter.pageNumber - 1);
  };

  const handleNext = () => {
    if (filter.pageNumber < totalPages) changePageNumber(filter.pageNumber + 1);
  };
  return (
    <div className="flex flex-row justify-between w-full ">
      
      <Select defaultValue={filter.numberOfRows.toString()} onValueChange={changeNumberOfRows}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Rows per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="15">15 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
        </SelectContent>
      </Select>

      <div className=" flex justify-end">
        <Pagination>
          <PaginationContent className="border rounded-sm">
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>

            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={filter.pageNumber === page}
                  onClick={() => handlePageClick(page)}
                  className={`${filter.pageNumber === page ? 'text-blue-600 bg-gray-50':''}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
