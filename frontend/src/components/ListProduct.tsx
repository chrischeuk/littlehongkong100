import { Link } from "react-router-dom";

type ProductType = {
  id: string;
  product_name: string;
  images: string[];
  product_id: string;
  spec: string;
  brand_name: string;
  items: ItemType[];
};
type ItemType = {
  id: string;
  spec: string;
};

type ListProductProps = {
  products: ProductType[];
  startDate: Date | null;
  endDate: Date | null;
};

export default function ListProduct({
  products,
  startDate,
  endDate,
}: ListProductProps): any {
  return (
    products.length > 0 && (
      <div className="container my-10 mx-auto grid grid-cols-1 gap-4 items-center sm:grid-cols-2 md:grid-cols-3">
        {products.map((product: ProductType) => {
          return (
            <div
              key={product?.id + product?.product_name}
              className=" bg-white-50 p-1 flex flex-row sm:flex-col  sm:hover:bg-slate-100"
            >
              <div className="basis-1/2 sm:basis-1">
                <img
                  src={product?.images[0]}
                  alt="React Image"
                  className="object-fill"
                />
              </div>
              <div className="container basis-1/2 place-content-center flex flex-col sm:basis-1 sm:text-center">
                <p className="font-bold text-2xl pt-2">
                  {product.product_name}
                </p>
                <p className="font-bold text-sm ">{product.brand_name}</p>

                <div>
                  {product?.items.length == 0 && <p>not available</p>}
                  {product?.items.map((item: ItemType) => {
                    if (!item) {
                      return <p>not available </p>;
                    }
                    return (
                      <Link
                        key={item.id + item.spec}
                        to={`/item/${item.id}`}
                        state={{
                          name: item.spec,
                          startDate: startDate,
                          endDate: endDate,
                        }}
                      >
                        {item.spec}{" "}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
