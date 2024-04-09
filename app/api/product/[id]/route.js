import Product from "@models/product";

export async function GET(request, { params }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request) {
  const { id, title, category, description, price, imageUrls, properties } =
    await request.json();
  try {
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
    return Response.json(updatedProduct, { status: 200 });
  } catch (error) {
    return new Response("Error Updating product", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await Product.findByIdAndDelete(params.id);
    return Response.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting product", { status: 500 });
  }
}
