"use client";

import TimesheetGrid from "@/components/timesheetWeek/TimesheetGrid";
import TimesheetHeader from "@/components/timesheetWeek/TimesheetHeader";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWeekForDate } from "@/utils/dateUtils";
import { formatDate } from "@/utils/formatDate";
import { WeeklyTimesheet } from "@/types/TimesheetInterface";
import TimesheetSkeleton from "@/components/skeleton/TimesheetSkeleton";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [singleTimesheetData, setSingleTimesheetData] =
    useState<WeeklyTimesheet>({
      start: "",
      end: "",
      hoursTotal: 0,
      hoursCompleted: 0,
      days: [],
    });
  const params = useParams();

  let start: string | undefined;
  let end: string | undefined;


  const weekId = Array.isArray(params.week)
    ? params.week[0] // if it's an array, take the first
    : params.week;

  if (weekId) {
    const [startDate, endDate] = weekId.split("_");
    start = startDate;
    end = endDate;
  }
  const fetchTasks = useCallback(async () => {
    if (!start || !end) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks?start=${start}&end=${end}`
      );
      const data = await res.json();
      const val = getWeekForDate(end, data);
      setSingleTimesheetData(val);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [start, end]);

  useEffect(() => {
    fetchTasks();
   
  }, [ fetchTasks]);

  if (loading) {
    return <TimesheetSkeleton />;
  }

  return (
    <div className="p-6 space-y-6  bg-white shadow-md rounded-md border  ">
      <TimesheetHeader
        weekRange={formatDate(
          singleTimesheetData.start,
          singleTimesheetData.end
        )}
        totalHours={singleTimesheetData.hoursCompleted}
        targetHours={singleTimesheetData.hoursTotal}
      />
      <TimesheetGrid days={singleTimesheetData.days} refresh={fetchTasks} />
    </div>
  );
};

export default Page;
