import Categorie from "@models/categorie";
import { connectToDB } from "@utils/database";

export async function PUT(request, { params }) {
  const { name, parentCatg, properties } = await request.json();
  try {
    await connectToDB();

    const editedCategory = await Categorie.findByIdAndUpdate(
      params.id,
      {
        $set: {
          name,
          parent: parentCatg,
          properties,
        },
      },
      { new: true }
    );
    return Response.json(editedCategory, { status: 200 });
  } catch (error) {
    return new Response("Error deleting Categorie", { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectToDB();

    await Categorie.findByIdAndDelete(params.id);
    return Response.json("Categorie deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Categorie", { status: 500 });
  }
}
