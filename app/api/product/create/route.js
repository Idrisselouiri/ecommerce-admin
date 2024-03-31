import Product from "@models/product";
import { connectToDB } from "@utils/database";

export async function POST(request) {
  const { title, description, price } = await request.json();

  try {
    await connectToDB();

    const newProduct = new Product({
      title,
      description,
      price,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new product", { status: 500 });
  }
}
