"use client";

import { Progress } from "@/components/ui/progress";

interface TimesheetHeaderProps {
  weekRange: string;
  totalHours: number;
  targetHours: number;
}

export default function TimesheetHeader({ weekRange, totalHours, targetHours }: TimesheetHeaderProps) {
  const percentage = (totalHours / targetHours) * 100;

  return (
    <div className="flex items-center justify-between pb-4 ">
      <div>
        <h2 className="text-lg font-semibold mb-4">This week’s timesheet</h2>
        <p className="text-sm text-muted-foreground">{weekRange}</p>
      </div>
      <div className="w-48 ">
        <p className="text-sm mb-4 w-full text-center">{totalHours} / {targetHours} hrs</p>
        <Progress value={percentage}  className=""/>
      </div>
    </div>
  );
}
