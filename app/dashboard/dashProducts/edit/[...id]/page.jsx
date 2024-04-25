"use client";

import { AdminCheck } from "@components/AdminCheck";
import Form from "@components/Form";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { loading: adminLoading, data: adminData } = AdminCheck();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setProduct(null);
        const res = await fetch(`/api/product/${params?.id}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          setProduct(null);
        }
        if (res.ok) {
          setLoading(false);
          setError(null);
          setProduct(data);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setProduct(null);
      }
    };
    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  if (adminData.isAdmin) {
    return (
      <>
        <div className="max-sm:p-4">
          <div className="sm:flex sm:items-center sm:justify-center">
            <div className="text-center sm:text-left">
              <p className="my-4 text-xl text-red-500">
                Editing <span className="text-green-600">{product?.title}</span>
              </p>
            </div>
          </div>
          <hr class="my-8 h-px border-0 bg-gray-300" />
          <div className="my-10 max-sm:my-12">
            {loading && <p className="w-full text-center">loading...</p>}
            {error && (
              <p className="w-full text-center text-red-600">{error}</p>
            )}
            {!loading && !error && product && <Form {...product} />}
          </div>
        </div>
      </>
    );
  } else if (!adminLoading && !adminData.isAdmin) {
    return redirect("/");
  }
};

export default page;
