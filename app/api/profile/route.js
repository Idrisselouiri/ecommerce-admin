import User from "@models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";
import { UserInfo } from "@models/userInfo";

export async function PUT(request) {
  const data = await request.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filter = { email };
  }

  if (data.name) {
    if (data.name.length < 7 || data.name.length > 20) {
      return Response.json(
        {
          message: "Username must be between 7 and 20 characters",
          success: false,
        },
        { status: 400 }
      );
    }
    if (data.name.includes(" ")) {
      return Response.json(
        { message: "Username cannot contain spaces", success: false },
        { status: 400 }
      );
    }
    if (data.name !== data.name.toLowerCase()) {
      return Response.json(
        { message: "Username must be lowercase", success: false },
        { status: 400 }
      );
    }
    if (!data.name.match(/^[a-zA-Z0-9]+$/)) {
      return Response.json(
        {
          message: "Username can only contain letters and numbers",
          success: false,
        },
        { status: 400 }
      );
    }
  }
  try {
    await mongooseConnect();
    const user = await User.findOne(filter);
    await User.updateOne(filter, { name, image });
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
      upsert: true,
    });
    return Response.json(
      { message: "Updated Successfull", success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
export async function DELETE(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const _id = searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  try {
    await mongooseConnect();
    const user = await User.findOne(filterUser).lean();
    await User.findOneAndDelete(filterUser);
    await UserInfo.findOneAndDelete({ email: user.email });
    return Response.json(
      { message: "Deleted  Successfull", success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const _id = searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  try {
    await mongooseConnect();
    const user = await User.findOne(filterUser).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message, success: false },
      { status: 404 }
    );
  }
}
