import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import HelloFromRail from "../components/HelloFromRail";
import "./list.css";
import { useSearchParams } from "react-router-dom";
import ListProduct from "../components/ListProduct";
import JSONAPISerializer from "json-api-serializer";
import Loading from "../components/Loading";

var Serializer = new JSONAPISerializer();
Serializer.register("item", {
  id: "id",
  relationships: {
    lease_records: {
      type: "lease_record",
    },
  },
});

Serializer.register("lease_record", {
  id: "id",
});

Serializer.register("product", {
  id: "id",
  relationships: {
    items: {
      type: "item",
    },
  },
});

localStorage.theme = "light";

const BACKEND_API_URL =
  import.meta.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev";

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
function convertDateToString(date: Date | null): string {
  if (date == null) {
    return "";
  }
  const stringOut = date?.getTime().toString();
  return stringOut;
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

  const getSerializedContent = async () => {
    console.log("getSerializedContent run");
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/api/v1/products/show_products_serialized`,
        {
          params: {
            date_from: startDate,
            date_to: endDate,
            page: 1,
          },
        }
      );

      // console.log(response.data);
      Serializer.deserializeAsync("product", response.data)
        .then((result: any) => {
          // console.log(result);
          updateProducts(result);
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !firstLoad && !loading) {
        fetchData();
        console.log("target isIntersecting");
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

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
        getSerializedContent();
      }
    } else {
      getSerializedContent();
    }
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      if (startDate !== null && endDate !== null) {
        setReachedTheEnd(false);
        setIndex(2);
        updateProducts(() => []);
        getSerializedContent();
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

  return (
    <div className="List ">
      <div className="sticky top-0  bg-white text-center w-full ">
        <UTCDatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          setDateRange={setDateRange}
          withPortal
          // inline
          disabledKeyboardNavigation
        />
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
