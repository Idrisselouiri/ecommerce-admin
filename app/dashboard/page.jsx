"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { AdminCheck } from "@components/AdminCheck";
import { redirect } from "next/navigation";
import Layouts from "@components/Layouts";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loading: adminLoading, data: adminData } = AdminCheck();
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product/getProducts");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category/get");
      const data = await res.json();

      if (res.ok) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const totalImagesCount = products.reduce(
    (total, product) => total + product.imageUrls.length,
    0
  );
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  if (adminLoading) {
    return (
      <p className="w-full text-2xl font-semibold text-center">Cheking...</p>
    );
  }

  if (adminData.isAdmin) {
    return (
      <Layouts>
        <main className={` min-h-screen w-full mx-auto p-4`}>
          {/* Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button> */}
          <header>
            <div className="mx-auto px-6 sm:px-0 py-8 md:py-12">
              <div className="xl:flex xl:items-center xl:justify-between">
                <div className="text-center xl:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                    Welcome Back,{" "}
                    <span className="text-green-700 font-bold">
                      {session.user.name}
                    </span>
                  </h1>

                  <p className="mt-1.5 text-md text-gray-500 xl:max-w-xl ">
                    View the statistics about your business. Also manage and add
                    products.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-4 md:flex-row justify-center items-center ">
                  <Link
                    href={"/dashboard/dashProducts"}
                    className="w-4/5 md:w-fit inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-500 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-sm font-medium"> View Products </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={"https://my-shop-front-eclarkhalid.vercel.app/"}
                    target="_blank"
                    className="w-4/5 md:w-fit inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-sm font-medium"> View Shop </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </Link>
                  {/* <button onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-400 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> Logout </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>

                </button> */}
                </div>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-4 w-3/5 md:w-full mx-auto md:mx-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="h-32  rounded-lg bg-gray-200 flex items-center justify-center">
              <article className="flex max-md:flex-col items-end justify-between rounded-lg gap-4">
                <div>
                  <p className="text-sm text-gray-500">Profit</p>

                  <p className="text-2xl font-medium text-gray-900">
                    ${formatPrice(totalPrice)}
                  </p>
                </div>

                <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>

                  <span className="text-xs font-medium"> 67.81% </span>
                </div>
              </article>
            </div>
            <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              <article className="flex items-end justify-between rounded-lg gap-4">
                <div>
                  <p className="text-sm text-gray-500">Products</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {products.length}
                  </p>
                </div>
                <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>

                  <span className="text-xs font-medium">
                    {" "}
                    {products.length}{" "}
                  </span>
                </div>
              </article>
            </div>
            <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              <article className="flex items-end justify-between rounded-lg gap-4">
                <div>
                  <p className="text-sm text-gray-500">Images</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {totalImagesCount}
                  </p>
                </div>
                <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <span className="text-xs font-medium">
                    {" "}
                    {totalImagesCount}{" "}
                  </span>
                </div>
              </article>
            </div>
            <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              <article className="flex items-end justify-between rounded-lg gap-4">
                <div>
                  <p className="text-sm text-gray-500">Categories</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {categories.length}
                  </p>
                </div>
                <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>

                  <span className="text-xs font-medium">
                    {" "}
                    {categories.length}{" "}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </main>
      </Layouts>
    );
  } else if (!adminData.isAdmin) {
    return redirect("/");
  }
};

export default Dashboard;
