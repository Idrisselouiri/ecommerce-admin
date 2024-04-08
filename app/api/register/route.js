import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password || email === "" || password === "") {
    return new Response("All fields are required", { status: 400 });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await connectToDB();
    await newUser.save();
    return new Response("Register successful", { status: 200 });
  } catch (error) {
    return new Response("Somthing Was Wrong", { status: 404 });
  }
}
