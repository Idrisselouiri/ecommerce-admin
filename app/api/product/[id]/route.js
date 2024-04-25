import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import Product from "@models/product";

export async function GET(request, { params }) {
  await mongooseConnect();
  try {
    if (await isAdmin()) {
      const product = await Product.findById(params.id);
      if (!product) {
        return Response.json(
          { message: "Product Not Found", success: false },
          { status: 404 }
        );
      }
      return Response.json(product, { status: 200 });
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

export async function PUT(request) {
  const { title, category, description, price, imageUrls, properties, id } =
    await request.json();

  try {
    await mongooseConnect();
    if (await isAdmin()) {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            category,
            description,
            price,
            imageUrls,
            properties,
          },
        },
        { new: true }
      );
      return Response.json(
        { message: "Updated Product Successfull", success: true },
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
      await Product.findByIdAndDelete(params.id);
      return Response.json(
        { message: "deleting Successfully", success: true },
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
