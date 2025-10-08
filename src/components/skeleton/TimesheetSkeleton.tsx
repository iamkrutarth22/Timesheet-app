const TimesheetSkeleton = () => {
  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-md border animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Grid skeleton */}
      <div className=" flex flex-col gap-5 mt-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2 space-x-5 flex ">
            <div className="h-8 bg-gray-300 rounded w-3/12"></div>
            <div className="h-16 bg-gray-200 rounded w-full">
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2 mx-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mt-2 mx-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TimesheetSkeleton;
