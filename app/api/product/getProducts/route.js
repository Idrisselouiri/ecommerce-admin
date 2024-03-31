import Product from "@models/product";
import { connectToDB } from "@utils/database";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 201 });
  } catch (error) {
    return new Response("Failed to get products", { status: 500 });
  }
}
