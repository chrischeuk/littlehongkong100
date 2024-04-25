import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// function cleanParams(date: string | null): Date | null {
//   if (date == null) {
//     return null;
//   }
//   const dateOut = new Date(date);
//   return dateOut;
// }

function parseParams(date: string | null): Date {
  if (date != null) {
    const dateOut = new Date(0);
    dateOut.setUTCMilliseconds(Number(date));
    return dateOut;
  } else {
    return new Date(0);
  }
}

export function useGetDateFromSearchParams(): [
  Date[],
  React.Dispatch<React.SetStateAction<Date[]>>
] {
  const [searchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<Date[]>([]);

  useEffect(() => {
    const startDate = parseParams(searchParams.get("startDate"));
    const endDate = parseParams(searchParams.get("endDate"));
    setDateRange(() => {
      return [startDate, endDate];
    });
  }, []);

  return [dateRange, setDateRange];
}
