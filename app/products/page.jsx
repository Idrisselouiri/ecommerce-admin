"use client";

import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Button, Table } from "flowbite-react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/product/getProducts");
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <div className="mx-auto">
        <Link
          href={"/products/newProduct"}
          className="flex justify-center items-center w-full my-10"
        >
          <Button gradientDuoTone="purpleToBlue" outline>
            Create a new product
          </Button>
        </Link>
        {loading ? <p>Loading...</p> : ""}
        <div className="overflow-x-auto">
          {!loading && products && (
            <Table>
              <Table.Head>
                <Table.HeadCell>Product title</Table.HeadCell>
                <Table.HeadCell>des</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">delete</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {products.map((product) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {product.title}
                    </Table.Cell>
                    <Table.Cell>Black</Table.Cell>
                    <Table.Cell>{product.category?.name}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`products/editProduct/${product._id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-2"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
