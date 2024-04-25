import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// function cleanParams(date: string | null): Date | null {
//   if (date == null) {
//     return null;
//   }
//   const dateOut = new Date(date);
//   return dateOut;
// }

function parseParams(date: string | null): Date | null {
  if (date != null) {
    const dateOut = new Date(0);
    dateOut.setUTCMilliseconds(Number(date));
    return dateOut;
  } else {
    return null;
  }
}

export function useGetDateFromSearchParams(): [
  Date[] | [Date | null, Date | null],
  React.Dispatch<React.SetStateAction<[Date | null, Date | null] | Date[]>>,
] {
  const [searchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<
    Date[] | [Date | null, Date | null]
  >([]);

  useEffect(() => {
    const startDate = parseParams(searchParams.get("startDate"));
    const endDate = parseParams(searchParams.get("endDate"));
    setDateRange(() => {
      return [startDate, endDate];
    });
  }, []);

  return [dateRange, setDateRange];
}
