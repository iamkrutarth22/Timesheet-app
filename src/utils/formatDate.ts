export function formatDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();

  const monthName = start.toLocaleString("default", { month: "long" });
  const year = start.getFullYear();

  const endMonthName = end.toLocaleString("default", { month: "long" });
  const endYear = end.getFullYear();

  if (year !== endYear) {
    return `${startDay} ${monthName} ${year} – ${endDay} ${endMonthName} ${endYear}`;
  } else if (monthName !== endMonthName) {
    return `${startDay} ${monthName} – ${endDay} ${endMonthName} ${year}`;
  } else {
    return `${startDay} – ${endDay} ${monthName} ${year}`;
  }
}


export function dateShortFormat(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthName = date.toLocaleString("default", { month: "short" });
  return  `${day} ${monthName}`;
}