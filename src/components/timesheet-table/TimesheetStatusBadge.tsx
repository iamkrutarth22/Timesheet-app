import { Badge } from "@/components/ui/badge";

export default function TimesheetStatusBadge({ status }: { status: string }) {
  const color =
    status === "completed"
      ? "bg-green-500/20 text-green-700 "
      : status === "incomplete"
      ? "bg-yellow-500/20 text-yellow-700"
      : "bg-red-500/20 text-red-700";

  return (
    <Badge className={`${color} capitalize`}>
      {status.toUpperCase()}
    </Badge>
  );
}
