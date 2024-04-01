"use client";

import Form from "@components/Form";
import Layout from "@components/Layout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
  });
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${params?.id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
          });
          setProduct(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/product/${product._id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: product._id,
          title: formData.title,
          description: formData.description,
          price: formData.price,
        }),
      });
      if (res.ok) {
        setLoading(false);
        setError(null);
        router.push("/products");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <Layout>
      <Form
        type="Edit Product"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Layout>
  );
};

export default EditProduct;
