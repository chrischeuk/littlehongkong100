import React, { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import UTCDatePicker from "../components/UTCDatePicker";
import axios from "axios";
import JSONAPISerializer from "json-api-serializer";

var Serializer = new JSONAPISerializer({
  convertCase: "kebab-case",
  unconvertCase: "camelCase",
  convertCaseCacheSize: 0,
});
Serializer.register("lease_record", {
  id: "id",
});

Serializer.register("item", {
  id: "id",
  relationships: {
    lease_records: {
      type: "lease_record",
    },
  },
});

const BACKEND_API_URL =
  import.meta.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev";

type excludedDatesType = {
  start: Date;
  end: Date;
};

type responseType = {
  date_from: string;
  date_to: string;
  product_name: string;
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
  data = data.map((obj: responseType): excludedDatesType | null => {
    return {
      start: convertUTCToLocalDate(new Date(obj.date_from)),
      end: convertUTCToLocalDate(new Date(obj.date_to)),
    };
  });

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
  const [data, setData] = useState<responseType[] | null>(null);
  const [serial, setSerial] = useState<responseType[] | null>(null);
  const [excludedDates, setExcludedDates] =
    useState<Array<excludedDatesType>>();

  let location = useLocation();
  // const {startDate,endDate}= location.state

  const getContent = async () => {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/items/show_item/${id}`
    );
    // console.log(response.data);
    setData(response.data);
    setExcludedDates(processResponse(response.data));
  };
  const getSerializedContent = async () => {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/items/show_item_serialized/${id}`
    );

    Serializer.deserializeAsync("item", response.data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getContent();
    getSerializedContent();

    if (startDate !== null && endDate !== null) {
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <p>Item {id}</p>
      <p>{data && data[0].product_name}</p>

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
