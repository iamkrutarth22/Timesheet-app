"use client";

import React, { useContext, useEffect, useState } from "react";
import TimesheetRow from "./TimeSheetRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timesheet } from "@/types/TimesheetInterface";
import { FilterContext } from "@/context/FilterContext";
import { getWeeksInRange } from "@/utils/dateUtils";

const TimesheetTable = () => {
  const { filter } = useContext(FilterContext);
  const [tableData, setTableData] = useState<Timesheet[]>([]);

  useEffect(() => {
    const getWeeklyTasks = async () => {
      const res = await fetch(
        `api/tasks?start=${filter.startDate}&end=${filter.endDate}`
      );
      const data = await res.json();

      const value = getWeeksInRange(filter.startDate, filter.endDate, data)
        .filter((item) => {
          if (filter.status === "all") return true;
          return item.status === filter.status;
        })
        .slice(
          (filter.pageNumber - 1) * filter.numberOfRows,
          filter.pageNumber * filter.numberOfRows
        );
      setTableData(value);
    };
    getWeeklyTasks();
  }, [filter]);

  return (
    <Table className="w-full bg-white">
      <TableHeader className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
        <TableRow>
          <TableHead className="p-3">Week #</TableHead>
          <TableHead className="p-3">Date Range</TableHead>
          <TableHead className="p-3">Status</TableHead>
          <TableHead className="p-3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((t, index) => (
          <TimesheetRow
            key={`${t.start}+${t.end}`}
            timesheet={t}
            weekNumber={index}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TimesheetTable;
