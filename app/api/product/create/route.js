import Product from "@models/product";
import { connectToDB } from "@utils/database";

export async function POST(request) {
  const { title, category, description, price, imageUrls, properties } =
    await request.json();

  try {
    await connectToDB();

    const newProduct = new Product({
      title,
      category,
      description,
      price,
      imageUrls,
      properties,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new product", { status: 500 });
  }
}
