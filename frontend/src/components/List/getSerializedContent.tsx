import axios from "axios";
import { BACKEND_API_URL } from "../../utilities/globalVariables";
import JSONAPISerializer from "json-api-serializer";
import { ProductType } from "../../views/List";

export const Serializer = new JSONAPISerializer();
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

type getSerializedContentPropsType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date | null;
  endDate: Date | null;
  updateProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

export default async function getSerializedContent({
  setLoading,
  startDate,
  endDate,
  updateProducts,
}: getSerializedContentPropsType) {
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

    Serializer.deserializeAsync("product", response.data)
      .then((result: any) => {
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
}
