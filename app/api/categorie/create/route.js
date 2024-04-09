import Categorie from "@models/categorie";

export async function POST(request) {
  const { name, parentCatg, properties } = await request.json();
  try {
    const newCategory = new Categorie({
      name,
      parent: parentCatg,
      properties,
    });
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Somthing was Wrong", { status: 400 });
  }
}
