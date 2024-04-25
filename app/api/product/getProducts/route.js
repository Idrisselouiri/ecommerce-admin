import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Product from "@models/product";

export async function GET() {
  try {
    await mongooseConnect();
    if (await isAdmin()) {
      const products = await Product.find();
      return Response.json(products, { status: 200 });
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
