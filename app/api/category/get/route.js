import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Category from "@models/category";

export async function GET() {
  await mongooseConnect();
  try {
    if (await isAdmin()) {
      const categories = await Category.find().populate("parent");
      return Response.json(categories, { status: 200 });
    } else {
      return Response.json({});
    }
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
