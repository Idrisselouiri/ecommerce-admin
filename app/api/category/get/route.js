import { mongooseConnect } from "@lib/mongoose";
import Category from "@models/category";

export async function GET() {
  await mongooseConnect();
  try {
    const categories = await Category.find().populate("parent");
    return Response.json(categories, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
