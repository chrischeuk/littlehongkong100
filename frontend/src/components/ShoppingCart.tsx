import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useLocalStorageState from "use-local-storage-state";
import { ProductType } from "../views/List";
import { Link } from "react-router-dom";

export type CartProps = {
  [productId: string]: ProductType;
};
export default function ShoppingCart() {
  const [cart] = useLocalStorageState<CartProps>("cart", {});
  const productsCount: number = Object.keys(cart || {}).length;

  return (
    <Link to="/cart">
      <div className="flex flex-row">
        <ShoppingCartIcon className="w-6 h-6 mx-3" />
        <p>{productsCount}</p>
      </div>
    </Link>
  );
}
