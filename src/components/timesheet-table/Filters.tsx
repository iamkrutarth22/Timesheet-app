"use client";
import React, { useContext } from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { FilterContext } from "@/context/FilterContext";
import { DateRangePicker } from "../ui/date-range-picker";
// import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
// import { Button } from "../ui/button";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";

const Filters = () => {
  const { filter, changeStatus, setDateRange } = useContext(FilterContext);
   const handleDateChange = (range: { start: string; end: string }) => {
    console.log("Selected Range:", range)
    setDateRange(range.start,range.end)
  }
  
  return (
    <div className="flex gap-4 items-center">
      <DateRangePicker  defaultStart={filter.startDate} defaultEnd={filter.endDate}  onChange={handleDateChange}/>

      <Select value={filter.status} onValueChange={changeStatus}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="incomplete">Incomplete</SelectItem>
          <SelectItem value="missing">Missing</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
