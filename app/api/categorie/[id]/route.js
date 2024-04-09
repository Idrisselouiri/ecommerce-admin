import Categorie from "@models/categorie";

export async function PUT(request, { params }) {
  const { name, parentCatg, properties } = await request.json();
  try {
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
    await Categorie.findByIdAndDelete(params.id);
    return Response.json("Categorie deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Categorie", { status: 500 });
  }
}
