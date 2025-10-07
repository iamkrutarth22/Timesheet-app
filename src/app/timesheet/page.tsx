import Filters from "@/components/timesheet-table/Filters";
import PaginationCompenent from "@/components/timesheet-table/Pagination";

import TimesheetTable from "@/components/timesheet-table/TimesheetTable";
import { FilterProvider } from "@/context/FilterContext";
import React from "react";

const page = () => {

 
  return (
    <div className=" space-y-6 bg-white p-6 shadow-md rounded-lg">
      <FilterProvider>
        <Filters />
        <TimesheetTable />
        <PaginationCompenent />
      </FilterProvider>
    </div>
  );
};

export default page;