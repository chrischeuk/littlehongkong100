import React, { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import UTCDatePicker from "../components/UTCDatePicker";
import axios from "axios";
import JSONAPISerializer from "json-api-serializer";
import { ProductType } from "./List";
import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../components/ShoppingCart";

var Serializer = new JSONAPISerializer();
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
  available_from: string;
  available_to: string;
  images: string[];
  spec: string;
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

// type URLSearchParamsType = {
//   startDate: string;
//   endDate: string;
// };

function processResponse(data: any | null): excludedDatesType[] | undefined {
  data = data.map((obj: responseType): excludedDatesType | null => {
    return {
      start: convertUTCToLocalDate(new Date(obj.date_from)),
      end: convertUTCToLocalDate(new Date(obj.date_to)),
    };
  });

  return data;
}

// function cleanParams(date: string | null): Date | null {
//   if (date == null) {
//     return null;
//   }

//   const dateOut = new Date(date);
//   return dateOut;
// }

export default function Item() {
  const { id } = useParams();
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  // const [searchParams, setSearchParams] = useSearchParams({
  //   startDate: "",
  //   endDate: "",
  // });

  // const startDate = cleanParams(searchParams.get("startDate"));
  // const endDate = cleanParams(searchParams.get("endDate"));
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<responseType[] | null>(null);
  const [excludedDates, setExcludedDates] =
    useState<Array<excludedDatesType>>();

  // let location = useLocation();
  // const {startDate,endDate}= location.state

  const getSerializedContent = async () => {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/items/show_item_serialized/${id}`
    );

    Serializer.deserializeAsync("item", response.data)
      .then((result: any) => {
        setData(result);
        setExcludedDates(processResponse(result[0].lease_records));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getSerializedContent();

    if (startDate !== null && endDate !== null) {
    }
  }, []);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
        // minDate={convertUTCToLocalDate(data[0].available_from)}
        available_from={data ? data[0].available_from : ""}
        available_to={data ? data[0].available_to : ""}
      />
      {/* <p>{excludedDates}</p> */}
      <br />
      <p>
        {startDate &&
          endDate &&
          `${formatter.format(startDate)} - ${formatter.format(endDate)}`}
      </p>

      {data && <img src={data[0].images[0]} />}
      <p className="text-xl font-bold">{data && data[0].product_name}</p>
      <p className="text-lg font-bold text-red-400 ">{data && data[0].spec}</p>
    </div>
  );
}
