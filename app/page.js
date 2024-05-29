"use client";

import Categories from "@components/home/Categories";
import Categories2 from "@components/home/Categories2";
import Footer from "@components/home/Footer";
import Hero from "@components/home/Hero";
import Partners from "@components/home/Partners";
import Services from "@components/home/Services";
import ProductBox from "@components/product/ProductBox";
import React, { useEffect, useState } from "react";

const page = () => {
  const [productsHero, setProductsHero] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/product/getProducts?startIndex=0&limit=3`);
      const data = await res.json();
      if (res.ok) {
        setProductsHero(data.products);
      }
    };
    fetchProducts();
  }, []);
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
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product/getProducts?limit=8&sort=desc");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Hero products={productsHero} categories={categories} />
      <Categories />
      <Categories2 />
      <Services />
      <ProductBox products={products} textHeading={"Best Seller Products"} />
      <Partners />
      <Footer />
    </div>
  );
};

export default page;
