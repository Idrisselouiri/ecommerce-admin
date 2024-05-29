"use client";

import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@components/Provider";
import { AdminCheck } from "@components/AdminCheck";
import toast from "react-hot-toast";

const Cart = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const { data: profileData } = AdminCheck();
  const [address, setAddress] = useState({});

  useEffect(() => {
    const fetchCartProducts = async () => {
      const uniqIds = [...new Set(selectedProducts)];
      console.log(uniqIds);
      const res = await fetch("/api/product?ids=" + uniqIds.join(","));
      const data = await res.json();
      if (res.ok) {
        setProductsInfos(data);
      }
    };
    fetchCartProducts();
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(ev) {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [ev.target.id]: ev.target.value,
    }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts: productsInfos,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (productsInfos?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <h2 className="text-primary font-bold text-4xl italic">Cart</h2>{" "}
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }
  return (
    <section className="mt-20 px-10 md:mt-10">
      <div className="overflow-x-auto mx-auto px-4 w-full">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md   rounded">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                Product Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                Product Price
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-gray-900 text-start font-bold">
                Product Quatity
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-gray-900 text-start font-bold">
                Product Total
              </th>
            </tr>
          </thead>
          {productsInfos.map((productInfo, index) => (
            <tbody className="divide-y divide-gray-200 " key={productInfo._id}>
              <tr className="border-b">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-2">
                  <div class="h-16 w-16">
                    <img
                      class="h-full w-full rounded-full object-cover object-center bg-gray-200"
                      src={productInfo.imageUrls?.[0]}
                      alt={productInfo.title}
                    />
                  </div>
                  <div>
                    <h4>{productInfo.title}</h4>
                    <button className="hover:text-red-600 underline	">
                      remove
                    </button>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 truncate max-w-md">
                  ${productInfo.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <div className="border-2 rounded-md flex items-center w-fit py-2 px-4 gap-8 text-lg">
                    <div>
                      <button
                        onClick={() => lessOfThisProduct(productInfo._id)}
                        className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                      >
                        -
                      </button>
                      <span className="px-2">
                        {
                          selectedProducts.filter(
                            (id) => id === productInfo._id
                          ).length
                        }
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(productInfo._id)}
                        className="bg-emerald-500 px-2 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  ${subtotal}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <button className="border py-2 px-4 my-5">Clear Cart</button>
      </div>
      <form onSubmit={proceedToCheckout}>
        <div className="mt-8 flex flex-col">
          <div className="mt-8">
            <input
              name="phone"
              id="phone"
              value={address.phone}
              onChange={handleAddressChange}
              className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded mb-2"
              type="number"
              placeholder="Your Phone"
            />
            <input
              name="streetAddress"
              id="streetAddress"
              value={address.streetAddress}
              onChange={handleAddressChange}
              className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded  mb-2"
              type="text"
              placeholder="Street address"
            />
            <input
              name="city"
              id="city"
              value={address.city}
              onChange={handleAddressChange}
              className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded  mb-2"
              type="text"
              placeholder="City"
            />
            <input
              name="country"
              id="country"
              value={address.country}
              onChange={handleAddressChange}
              className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded  mb-2"
              type="text"
              placeholder="Your country"
            />
            <input
              name="postalCode"
              id="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded "
              type="number"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold"> $5</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${subtotal + 5}</h3>
          </div>
        </div>
        <input type="hidden" name="products" />
        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${subtotal + 5}
        </button>
      </form>
    </section>
  );
};

export default Cart;
