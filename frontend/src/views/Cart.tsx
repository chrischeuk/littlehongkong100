// import useLocalStorageState from "use-local-storage-state";
// import { CartProps } from "../components/ShoppingCart";

// export default function Cart() {
//   const [cart, setCart] = useLocalStorageState<CartProps>("cart", {}); // reading the local storage value via the hook here
//   const getProducts = () => Object.values(cart || {}); // method for getting all products data as an array data structure, that will allow us easier iteration later

//   const handleRemoveProduct = (productId: number): void => {
//     setCart((prevCart) => {
//       const updatedCart = { ...prevCart };
//       delete updatedCart[productId];
//       return updatedCart;
//     });
//   };
//   return (
//     <>
//       <h1>Cart</h1>

//       <div>
//         {getProducts().map((product) => (
//           <div key={product.id} className="flex flex-row items-center gap-3">
//             <div className="basis-1/6">
//               <img
//                 src={product.images[0]}
//                 alt={product.product_name}
//                 className=""
//               />
//             </div>
//             <h3 className="basis-2/6 font-bold text-xl">
//               {product.product_name}
//             </h3>
//             <p className="basis-2/6 text-sm">
//               {product.startDate}
//               {product.endDate}
//             </p>
//             <button
//               className="basis-1/6 bg-slate-100"
//               onClick={() => {
//                 handleRemoveProduct(product.id);
//               }}
//             >
//               Remove item
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );

//   return <></>;
// }
