import React, { useEffect, useRef, useState } from "react";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import HelloFromRail from "../components/HelloFromRail";
import "./list.css";
import { useSearchParams } from "react-router-dom";
import ListProduct from "../components/ListProduct";
import Loading from "../components/Loading";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { convertDateToString } from "../utilities/TimeUtil";
import useInfiniteLoading from "../components/List/useInfiniteLoading";
import getSerializedContent from "../components/List/getSerializedContent";
import useFetchData from "../components/List/useFetchData";

localStorage.theme = "light";

type ItemType = {
  id: string;
  spec: string;
  available: boolean;
};

export type ProductType = {
  id: string;
  product_name: string;
  images: string[];
  product_id: string;
  spec: string;
  brand_name: string;
  items: ItemType[];
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

export default function List() {
  const [products, updateProducts] = React.useState<ProductType[]>([]);
  const [dateRange, setDateRange] = React.useState<Date[] >([]);
  const [startDate, endDate] = dateRange;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(2);
  const loaderRef = useRef(null);
  const [reachedTheEnd, setReachedTheEnd] = useState(false);

  const fetchData = useFetchData({
    loading,
    reachedTheEnd,
    setLoading,
    index,
    setIndex,
    updateProducts,
    setReachedTheEnd,
    startDate,
    endDate,
  });

  useEffect(() => {
    if (
      firstLoad &&
      searchParams.get("startDate") !== null &&
      searchParams.get("endDate") !== null &&
      searchParams.get("startDate") != "0"
    ) {
      setDateRange(() => {
        return [
          parseParams(searchParams.get("startDate")),
          parseParams(searchParams.get("endDate")),
        ];
      });
      if (startDate !== null && endDate !== null) {
        getSerializedContent({
          setLoading,
          startDate,
          endDate,
          updateProducts,
        });
      }
    } else {
      getSerializedContent({ setLoading, startDate, endDate, updateProducts });
    }
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      if (startDate !== null && endDate !== null) {
        setReachedTheEnd(false);
        setIndex(2);
        updateProducts(() => []);
        getSerializedContent({
          setLoading,
          startDate,
          endDate,
          updateProducts,
        });
        setSearchParams(
          (prev) => {
            prev.set("startDate", convertDateToString(startDate));
            prev.set("endDate", convertDateToString(endDate));
            return prev;
          },
          { replace: true }
        );
      }
    }
  }, [dateRange]);

  useInfiniteLoading({ fetchData, loaderRef, firstLoad, loading });
  return (
    <div className="List ">
      <div className="sticky top-0  bg-white text-center w-full flex items-center justify-center">
        <div className="basis-3/4 sm:basis-2/4">
          <UTCDatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
            withPortal
            disabledKeyboardNavigation
          />
        </div>
        <div className=" bg-slate-100  m-5 w-11 h-11 rounded-full flex justify-center flex-shrink-0">
          <AdjustmentsVerticalIcon className="w-5" />
        </div>
      </div>
      <ListProduct
        products={products}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="text-center" ref={loaderRef}>
        {loading && <Loading />}
      </div>
      {startDate && endDate && (
        <p className="text-sm">{`${startDate} ${endDate}`}</p>
      )}
      <HelloFromRail />
    </div>
  );
}
