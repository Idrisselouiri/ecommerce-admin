"use client";

import React, { useState } from "react";
import Layout from "@components/Layout";
import Form from "@components/Form";
import { useRouter } from "next/navigation";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/product/create", {
        method: "POST",
        body: JSON.stringify({
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
        type="Create Product"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Layout>
  );
};

export default NewProduct;
