import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import HelloFromRail from "../components/HelloFromRail";
import "./list.css";
import { useSearchParams } from "react-router-dom";
import ListProduct from "../components/ListProduct";
import Loading from "../components/Loading";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { convertDateToString } from "../utilities/TimeUtil";
import useInfiniteLoading from "../hooks/useInfiniteLoading";
import getSerializedContent, {
  Serializer,
} from "../components/List/getSerializedContent";
import { BACKEND_API_URL } from "../utilities/globalVariables";

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
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(2);
  const loaderRef = useRef(null);
  const [reachedTheEnd, setReachedTheEnd] = useState(false);

  const fetchData = useCallback(async () => {
    if (loading || reachedTheEnd) return;
    setLoading(() => true);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/api/v1/products/show_products_serialized`,
        {
          params: {
            date_from: startDate,
            date_to: endDate,
            page: index,
          },
        }
      );
      console.log("fetchdata " + index);
      setIndex((prevIndex) => prevIndex + 1);
      Serializer.deserializeAsync("product", response.data)
        .then((result: any) => {
          updateProducts((prevItems) => [...prevItems, ...result]);
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(() => false);
        });
      if (!response.data?.meta?.has_more_pages) {
        setReachedTheEnd(() => true);
      }
    } catch (err) {
      console.log(err);
      setReachedTheEnd(() => true);
      setLoading(() => false);
    }
    setLoading(() => false);
  }, [index, loading]);

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
