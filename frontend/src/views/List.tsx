import React, { useEffect, useState } from "react";
import axios from "axios";
import UTCDatePicker from "../components/UTCDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import HelloFromRail from "../components/HelloFromRail";
import "./list.css";
import { Link, useSearchParams } from "react-router-dom";

localStorage.theme = "light";

const BACKEND_API_URL =
  import.meta.env.REACT_APP_BACKEND_API_URL ||
  "https://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev";

type Product = {
  id: string;
  product_name: string;
  images: string[];
  product_id: string;
  spec: string;
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
  const [products, updateProducts] = React.useState<[Product[]]>([[]]);
  const [dateRange, setDateRange] = React.useState<Date[] | null[]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // const startDate = parseParams(searchParams.get("startDate"));
  // const endDate = parseParams(searchParams.get("endDate"));

  const getContent = async (
    startDate: Date,
    endDate: Date,
    updateProducts: React.Dispatch<React.SetStateAction<[Product[]]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(() => {
      return true;
    });
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/products/show_products`,
      {
        params: {
          date_from: startDate,
          date_to: endDate,
        },
      }
    );
    updateProducts(response.data);
    setLoading(() => {
      return false;
    });
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
        getContent(startDate, endDate, updateProducts, setLoading);
      }
    }
    setFirstLoad(false);
  }, []);

  React.useEffect(() => {
    if (!firstLoad) {
      if (startDate !== null && endDate !== null) {
        getContent(startDate, endDate, updateProducts, setLoading);
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
      {loading && (
        <div className="inline-block m-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      )}
      {products[0]?.length > 0 && (
        <div className="container mx-auto p-6 grid grid-cols-2 gap-4 items-center sm:grid-cols-3">
          {products.map((block: Product[]) => {
            return (
              <div
                key={block[0]?.id + block[0]?.product_name}
                className=" bg-white-50 p-1  hover:bg-slate-100 m-1"
              >
                <div>
                  <img
                    src={block[0].images[0]}
                    alt="React Image"
                    className="object-fill"
                  />
                  <p>{block[0].product_name}</p>
                </div>
                {block.map((product: Product) => {
                  return (
                    <Link
                      key={product.id + product.spec}
                      to={`/item/${product.id}`}
                      state={{
                        name: product.spec,
                        startDate: startDate,
                        endDate: endDate,
                      }}
                    >
                      {product.spec}{" "}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      {startDate && endDate && <p className="text-sm">{`${startDate} ${endDate}`}</p>}
      <HelloFromRail />
    </div>
  );
}
