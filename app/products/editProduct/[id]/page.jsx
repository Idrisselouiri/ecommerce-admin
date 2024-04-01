"use client";

import Form from "@components/Form";
import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${params?.id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);

  return <Layout>{product && <Form {...product} />}</Layout>;
};

export default EditProduct;
