import axios from "axios";
import { useCallback } from "react";
import { BACKEND_API_URL } from "../../utilities/globalVariables";
import { Serializer } from "./getSerializedContent";
import { ProductType } from "../../views/List";

type useFetchDataPropsType = {
  loading: boolean;
  reachedTheEnd: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  updateProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setReachedTheEnd: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date | null;
  endDate: Date | null;
};

export default function useFetchData({
  loading,
  reachedTheEnd,
  setLoading,
  index,
  setIndex,
  updateProducts,
  setReachedTheEnd,
  startDate,
  endDate,
}: useFetchDataPropsType) {
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

  return fetchData;
}
