import { useContext } from "react";
import { ProductsContext } from "../Provider";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Product(productItem) {
  const { _id, title, price, description, imageUrls } = productItem;
  const { setSelectedProducts } = useContext(ProductsContext);
  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
    toast("Product Added to cart");
  }
  return (
    <div className="w-[250px] border rounded-xl p-2">
      <div className="bg-slate-100 p-2 rounded-xl ">
        <Link href={"/products/" + _id}>
          <img
            src={imageUrls}
            className="w-full h-[150px] object-contain"
            alt=""
          />
        </Link>
      </div>
      <div className="mt-2">
        <Link href={"/products/" + _id}>
          <h3 className="font-bold text-lg">{title}</h3>
        </Link>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500 line-clamp-3">
        {description}
      </p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${price}</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
