import { Link } from "react-router-dom";

type ProductType = {
  id: string;
  product_name: string;
  images: string[];
  product_id: string;
  spec: string;
  brand_name: string;
};

type ListProductProps = {
  products: [ProductType[]];
  startDate: Date | null;
  endDate: Date | null;
};

export default function ListProduct({
  products,
  startDate,
  endDate,
}: ListProductProps): any {
  return (
    products[0]?.length > 0 && (
      <div className="container my-10 mx-auto grid grid-cols-1 gap-4 items-center sm:grid-cols-2 md:grid-cols-3">
        {products.map((block: ProductType[]) => {
          return (
            <div
              key={block[0]?.id + block[0]?.product_name}
              className=" bg-white-50 p-1 flex flex-row sm:flex-col  sm:hover:bg-slate-100"
            >
              <div className="basis-1/2 sm:basis-1">
                <img
                  src={block[0].images[0]}
                  alt="React Image"
                  className="object-fill"
                />
              </div>
              <div className="container basis-1/2 place-content-center flex flex-col sm:basis-1 sm:text-center">
                <p className="font-bold text-2xl pt-2">
                  {block[0].product_name}
                </p>
                <p className="font-bold text-sm ">{block[0].brand_name}</p>

                <div>
                  {block.map((product: ProductType) => {
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
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
