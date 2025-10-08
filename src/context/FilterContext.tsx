"use client";

import React, { useState, createContext } from "react";
import { Filter } from "@/types/FilterInterface";

interface FilterContextType {
  filter: Filter;
  changeStatus: (status: "complted" | "missing" | "incomplete" | "all") => void;
  setDateRange: (startDate: string , endDate: string) => void;
  changeNumberOfRows: (numberOfRows: string) => void;
  changePageNumber: (pageNumber: number) => void;
}

const FilterContext = createContext<FilterContextType>({
  filter: {
    startDate: "2025-07-01",
    endDate:"2025-09-08",
    status: "all",
    numberOfRows: 5,
    pageNumber: 1,
  },
  changeStatus: () => {},
  setDateRange: () => {},
  changeNumberOfRows: () => {},
  changePageNumber: () => {},
});

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>({
    startDate: "2025-06-26",
    endDate: "2025-09-08",
    status: "all",
    numberOfRows: 5,
    pageNumber: 1,
  });

  const changeStatus = (
    status: "complted" | "missing" | "incomplete" | "all"
  ) => {
    setFilter((prev) => ({ ...prev, status }));
  };

  const setDateRange = (startDate: string, endDate: string) => {
    setFilter((prev) => ({ ...prev, startDate, endDate }));
  };

  const changeNumberOfRows = (numberOfRows: string) => {
     setFilter((prev) => ({ ...prev, numberOfRows:parseInt(numberOfRows) }));
  };
  
  const changePageNumber = (pageNumber: number) => {
     setFilter((prev) => ({ ...prev, pageNumber }));
  };

  return (
    <FilterContext.Provider
      value={{
        filter,
        changeStatus,
        setDateRange,
        changeNumberOfRows,
        changePageNumber,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
