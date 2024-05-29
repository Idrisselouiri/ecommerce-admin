"use client";

import Product from "@components/product/Product";
import ProductBox from "@components/product/ProductBox";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  console.log(products);
  const searchParams = useSearchParams();
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchProducts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `/api/product/getProducts?${searchQuery}&limit=9`
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
        if (data.products.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchProducts();
  }, [searchParams]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData({ ...sidebarData, category });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfProducts = products.length;
    const startIndex = numberOfProducts;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/product/getProducts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setProducts([...products, ...data.products]);
      if (data.products.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/category/get");
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-900"
            >
              Select Category
            </label>
            <select
              id="category"
              className="mt-1.5 p-3 w-full rounded-md border border-gray-300 text-gray-700"
              value={Sidebar.category}
              onChange={handleChange}
            >
              <option value="">No category selected</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </button>
        </form>
      </div>
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Products results:
        </h1>
        <div className="p-7 flex flex-wrap gap-8">
          {!loading && products.length === 0 && (
            <p className="text-xl text-gray-500">No products found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            products &&
            products.map((product) => (
              <div className="group" key={product._id}>
                <Product {...product} />
              </div>
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
