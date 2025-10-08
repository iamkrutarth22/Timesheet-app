"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

type DateRangePickerProps = {
  defaultStart?: string
  defaultEnd?: string
  onChange?: (range: { start: string; end: string }) => void
  className?: string
}

export function DateRangePicker({
  defaultStart,
  defaultEnd,
  onChange,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (defaultStart && defaultEnd) {
      return {
        from: new Date(defaultStart),
        to: new Date(defaultEnd),
      }
    }
    return undefined
  })

  // Store previous date values to compare and avoid unnecessary onChange calls
  const prevDateRef = React.useRef<DateRange | undefined>(date)

  // Watch for date changes and call the parent handler
  React.useEffect(() => {
    if (date?.from && date?.to) {
      const start = format(date.from, "yyyy-MM-dd")
      const end = format(date.to, "yyyy-MM-dd")
      
      // Compare with previous dates to avoid unnecessary updates
      const prevStart = prevDateRef.current?.from
        ? format(prevDateRef.current.from, "yyyy-MM-dd")
        : null
      const prevEnd = prevDateRef.current?.to
        ? format(prevDateRef.current.to, "yyyy-MM-dd")
        : null

      if (start !== prevStart || end !== prevEnd) {
        onChange?.({ start, end })
        prevDateRef.current = date // Update the ref after calling onChange
      }
    }
  }, [date, onChange])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} - {" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}