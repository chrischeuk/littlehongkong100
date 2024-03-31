import React, { useEffect, useState } from "react";
import axios from "axios";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import HelloFromRail from "../components/HelloFromRail";
import "./list.css";
import { Link, useSearchParams } from "react-router-dom";

const BACKEND_API_URL =
  import.meta.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev";

type Item = {
  id: string;
  item_name: string;
  product: {
    images: string[];
  };
};
function parseParams(date: string | null): Date {
  if (date != null) {
    const dateOut = new Date(0);
    dateOut.setUTCMilliseconds(Number(date));
    return dateOut;
  } else {
    return new Date(0);
  }
}
function convertDateToString(date: Date | null): string {
  if (date == null) {
    return "";
  }
  const stringOut = date?.getTime().toString();
  return stringOut;
}
export default function List() {
  const [items, updateItems] = React.useState<Item[]>([]);
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  // const startDate = parseParams(searchParams.get("startDate"));
  // const endDate = parseParams(searchParams.get("endDate"));

  const getContent = async (
    startDate: Date,
    endDate: Date,
    updateItems: React.Dispatch<React.SetStateAction<Item[]>>
  ) => {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/items/show_items`,
      {
        params: {
          date_from: startDate,
          date_to: endDate,
        },
      }
    );
    updateItems(response.data);
  };

  useEffect(() => {
    if (
      firstLoad &&
      searchParams.get("startDate") !== null &&
      searchParams.get("endDate") !== null
    ) {
      setDateRange(() => {
        return [
          parseParams(searchParams.get("startDate")),
          parseParams(searchParams.get("endDate")),
        ];
      });

      if (startDate !== null && endDate !== null) {
        getContent(startDate, endDate, updateItems);
      }
    }
    setFirstLoad(false);
  }, []);

  React.useEffect(() => {
    if (!firstLoad) {
      if (startDate !== null && endDate !== null) {
        getContent(startDate, endDate, updateItems);
      }
      setSearchParams(
        (prev) => {
          prev.set("startDate", convertDateToString(startDate));
          prev.set("endDate", convertDateToString(endDate));
          return prev;
        },
        { replace: true }
      );
    }
  }, [dateRange]);

  return (
    <div className="List">
      <HelloFromRail />
      <UTCDatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        // setSearchParams={setSearchParams}
        // withPortal
        inline
        disabledKeyboardNavigation
      />
      <br />
      <p>{`${startDate} ${endDate}`}</p>
      <div className="container mx-auto p-6 grid grid-cols-3 gap-4 items-center">
        {items.map((item) => {
          return (
            <Link
              className="card  "
              key={item.id + item.item_name}
              to={`/item/${item.id}`}
              state={{
                name: item.item_name,
                startDate: startDate,
                endDate: endDate,
              }}
            >
              <div className=" bg-white-50 p-1  hover:bg-slate-100 m-1">
                <img
                  src={item.product.images[0]}
                  alt="React Image"
                  className="object-fill"
                />
                <p>{item.item_name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
