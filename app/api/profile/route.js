import User from "@models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { mongooseConnect } from "@lib/mongoose";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  try {
    await mongooseConnect();
    const userInfo = await User.findOne({ email });
    return Response.json(userInfo, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
