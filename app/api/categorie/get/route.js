import Categorie from "@models/categorie";
import { connectToDB } from "@utils/database";

export async function GET() {
  try {
    await connectToDB();

    const categories = await Categorie.find().populate("parent");
    return new Response(JSON.stringify(categories), { status: 201 });
  } catch (error) {
    return new Response("Somthing was Wrong", { status: 400 });
  }
}
