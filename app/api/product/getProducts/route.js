import { mongooseConnect } from "@lib/mongoose";
import Product from "@models/product";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  try {
    await mongooseConnect();

    const startIndex = parseInt(searchParams.get("startIndex")) || 0;
    const limit = parseInt(searchParams.get("limit"));
    const sortDirection = searchParams.get("sort") === "asc" ? 1 : -1;
    const products = await Product.find({
      ...(searchParams.get("category") && {
        category: searchParams.get("category"),
      }),
      ...(searchParams.get("productId") && {
        _id: searchParams.get("productId"),
      }),
      ...(searchParams.get("searchTerm") && {
        $or: [
          { title: { $regex: searchParams.get("searchTerm"), $options: "i" } },
          {
            description: {
              $regex: searchParams.get("searchTerm"),
              $options: "i",
            },
          },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthProducts = await Product.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return Response.json(
      { products, totalProducts, lastMonthProducts },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
