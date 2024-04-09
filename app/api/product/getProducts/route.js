import Product from "@models/product";

export async function GET() {
  try {
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 201 });
  } catch (error) {
    return new Response("Failed to get products", { status: 500 });
  }
}
