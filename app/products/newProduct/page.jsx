"use client";

import React, { useState } from "react";
import Layout from "@components/Layout";
import Form from "@components/Form";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
        }),
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Form
        type="Create a Product"
        setFormData={setFormData}
        formData={formData}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Layout>
  );
};

export default NewProduct;
