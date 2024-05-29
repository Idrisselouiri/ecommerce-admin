import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import User from "@models/user";

export async function DELETE(request, { params }) {
  await mongooseConnect();

  try {
    if (await isAdmin()) {
      await User.findByIdAndDelete(params.id);
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
