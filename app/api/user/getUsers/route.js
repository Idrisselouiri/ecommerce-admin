import { isAdmin } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import User from "@models/user";

export async function GET(request) {
  try {
    if (await isAdmin()) {
      await mongooseConnect();
      const users = await User.find();
      return Response.json(users, { status: 200 });
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
