import React, { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import UTCDatePicker from "../components/UTCDatePicker";
import axios from "axios";

const BACKEND_API_URL =
  process.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev";

type excludedDatesType = {
  start: Date;
  end: Date;
};
export function convertUTCToLocalDate(date: Date): Date {
  if (!date) {
    return date;
  }
  let dateOut = new Date(date);
  dateOut = new Date(
    dateOut.getUTCFullYear(),
    dateOut.getUTCMonth(),
    dateOut.getUTCDate()
  );
  return dateOut;
}

type URLSearchParamsType = {
  startDate: string;
  endDate: string;
};

function processResponse(data: any | null): excludedDatesType[] | undefined {
  data = data.map((obj: Array<Date>): excludedDatesType | null => {
    return {
      start: convertUTCToLocalDate(new Date(obj[0])),
      end: convertUTCToLocalDate(new Date(obj[1])),
    };
  });
  console.log(data);
  return data;
}

function cleanParams(date: string | null): Date | null {
  if (date == null) {
    return null;
  }

  const dateOut = new Date(date);
  return dateOut;
}

export default function Item() {
  const { id } = useParams();
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
  });

  // const startDate = cleanParams(searchParams.get("startDate"));
  // const endDate = cleanParams(searchParams.get("endDate"));
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<string | null>(null);
  const [excludedDates, setExcludedDates] =
    useState<Array<excludedDatesType>>();
  let location = useLocation();
  // const {startDate,endDate}= location.state
  const getContent = async (
    setDate: React.Dispatch<React.SetStateAction<string | null>>
    // startDate: Date,
    // endDate: Date
  ) => {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/items/show_item/${id}`
    );
    // console.log(response.data);
    setExcludedDates(processResponse(response.data));
  };

  React.useEffect(() => {
    getContent(setData);
    if (startDate !== null && endDate !== null) {
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <p>Item {id}</p>
      <UTCDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        // setSearchParams={setSearchParams}
        // withPortal
        inline
        disabledKeyboardNavigation
        excludeDateIntervals={excludedDates}
      />
      {/* <p>{excludedDates}</p> */}
    </div>
  );
}
