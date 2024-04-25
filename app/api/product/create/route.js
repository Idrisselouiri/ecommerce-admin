import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Product from "@models/product";

export async function POST(request) {
  const { title, category, description, price, imageUrls, properties } =
    await request.json();
  try {
    await mongooseConnect();
    const newProduct = new Product({
      title,
      category,
      description,
      price,
      imageUrls,
      properties,
    });
    await newProduct.save();
    return Response.json(
      { message: "Created Product Successfull", success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message, success: true },
      { status: 404 }
    );
  }
}
