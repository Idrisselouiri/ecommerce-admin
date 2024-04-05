import Categorie from "@models/categorie";
import { connectToDB } from "@utils/database";

export async function POST(request) {
  const { name, parentCatg } = await request.json();
  try {
    await connectToDB();
    const newCategory = new Categorie({ name, parent: parentCatg });
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Somthing was Wrong", { status: 400 });
  }
}
