import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Category from "@models/category";

export async function PUT(request, { params }) {
  const { name, parent, properties } = await request.json();
  try {
    await mongooseConnect();
    if (await isAdmin()) {
      const updatedCategory = await Category.findByIdAndUpdate(
        params.id,
        {
          $set: {
            name,
            parent,
            properties,
          },
        },
        { new: true }
      );
      return Response.json(
        { message: "Updated category Successfull", success: true },
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
export async function DELETE(request, { params }) {
  await mongooseConnect();
  try {
    if (await isAdmin()) {
      const deletedCategory = await Category.findByIdAndDelete(params.id);
      if (!deletedCategory) {
        return Response.json(
          { message: "Category Not Found", success: false },
          { status: 401 }
        );
      }
      return Response.json(
        { message: "Category deleted successfully", success: true },
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
