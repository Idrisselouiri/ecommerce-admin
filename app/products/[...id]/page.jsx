"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetails from "@components/product/ProductDetails";
import ProductBox from "@components/product/ProductBox";

const page = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`/api/product/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data);
        setLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product/getProducts?limit=" + 4);
      const data = await res.json();
      if (res.ok) {
        setRecentProducts(data.products);
      }
    };
    fetchProducts();
  }, []);
  if (loading) {
    return "loading...";
  }
  return (
    <div>
      <ProductDetails product={product} />
      <ProductBox products={recentProducts} textHeading={"Recent articles"} />
    </div>
  );
};

export default page;
