import { mongooseConnect } from "@lib/mongoose";
import Product from "@models/product";

export async function GET(request) {
  await mongooseConnect();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const ids = searchParams.get("ids");
  console.log(ids);
  if (ids) {
    const idsArray = ids.split(",");
    const products = await Product.find({
      _id: { $in: idsArray },
    }).exec();

    return Response.json(products, { status: 200 });
  } else {
    return Response.json({});
  }
}
