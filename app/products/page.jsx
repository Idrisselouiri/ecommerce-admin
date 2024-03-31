import React from "react";
import Layout from "@components/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";

const Products = () => {
  return (
    <Layout>
      <Link href={"/products/newProduct"}>
        <Button gradientDuoTone="purpleToBlue" outline>
          Create a new product
        </Button>
      </Link>
    </Layout>
  );
};

export default Products;
