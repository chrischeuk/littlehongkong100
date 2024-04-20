import { Link } from "react-router-dom";
import { ProductType } from "../views/List";


type ItemType = {
  id: string;
  spec: string;
  available: boolean;
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
              className=" bg-white-50 flex flex-row sm:flex-col p-2 sm:hover:border-slate-100 sm:hover:border-4"
            >
              <div className="basis-1/2 sm:basis-1">
                <img
                  src={product?.images[0]}
                  alt="React Image"
                  className="object-fill sm:hover:scale-105"
                />
              </div>
              <div className="container basis-1/2 place-content-center flex flex-col sm:basis-1 sm:text-center">
                <p className="font-bold text-2xl pt-2">
                  {product.product_name}
                </p>
                <p className="font-bold text-sm ">{product.brand_name}</p>

                <div>
                  {product?.items.length == 0 && (
                    <p className="text-sm text-blue-600">not available</p>
                  )}
                  {product?.items.map((item: ItemType) => {
                    return (
                      <button
                        key={item.id + item.spec}
                        className={`rounded-full ${
                          item.available ? "bg-blue-500" : "bg-slate-300"
                        } py-1 m-1 shadow-sm`}
                      >
                        <Link
                          to={`/item/${item.id}`}
                          target="_blank"
                          state={{
                            name: item.spec,
                            startDate: startDate,
                            endDate: endDate,
                          }}
                        >
                          <p className="text-sm text-white">{item.spec} </p>
                        </Link>
                      </button>
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
