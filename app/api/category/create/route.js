import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Category from "@models/category";

export async function POST(request) {
  const { name, parent, properties } = await request.json();
  try {
    await mongooseConnect();
    if (await isAdmin()) {
      const newCategory = new Category({
        name,
        parent: parent || undefined,
        properties,
      });
      await newCategory.save();
      return Response.json(
        { message: "Created Category successfully", success: true },
        { status: 200 }
      );
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
