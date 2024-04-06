import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import Categorie from "@models/categorie";
import { connectToDB } from "@utils/database";

export async function POST(request) {
  const { name, parentCatg, properties } = await request.json();
  try {
    await connectToDB();
    if (await isAdmin()) {
      const newCategory = new Categorie({
        name,
        parent: parentCatg,
        properties,
      });
      await newCategory.save();
      return new Response(JSON.stringify(newCategory), { status: 201 });
    } else {
      return Response.json({});
    }
  } catch (error) {
    return new Response("Somthing was Wrong", { status: 400 });
  }
}
