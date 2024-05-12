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
import { useGetDateFromSearchParams } from "../hooks/useGetDateFromSearchParams";

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

export default function List() {
  const [products, updateProducts] = React.useState<ProductType[]>([]);
  const [dateRange, setDateRange] = useGetDateFromSearchParams();
  const [startDate, endDate] = dateRange;
  const [, setSearchParams] = useSearchParams({});
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
    if (startDate !== undefined && endDate !== undefined) {
      getSerializedContent({ setLoading, startDate, endDate, updateProducts });
      setIndex(2);
      setFirstLoad(() => false);
      setReachedTheEnd(false);
      updateProducts(() => []);
      window.scrollTo(0, 0);
      if (startDate && endDate) {
        setSearchParams(
          (prev) => {
            prev.set("startDate", convertDateToString(startDate));
            prev.set("endDate", convertDateToString(endDate));
            return prev;
          },
          { replace: true },
        );
      }
    }
  }, [dateRange]);

  useInfiniteLoading({ fetchData, loaderRef, firstLoad, loading });

  return (
    <div className="List ">
      <div className="sticky top-0 flex w-full items-center justify-center bg-white text-center">
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
        <div className="m-5 flex h-11 w-11 flex-shrink-0 justify-center rounded-full bg-slate-100">
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
