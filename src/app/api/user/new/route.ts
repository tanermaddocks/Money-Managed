import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/lib/db/dbConnect";
import { UserModel } from "@/src/lib/db/models";
import { userSessionSchema } from "@/src/lib/db/schemas/user";
import { auth } from "@/src/auth";

export async function POST(request: NextRequest) {
  try {
    // Connect to DB
    await dbConnect();

    // Parse session data
    const session = await auth();
    const { success, data, error } = userSessionSchema.safeParse(session);
    if (!success) {
      const errorMessage = error.issues.map((i) => i.message).join("; ");
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    // Check if email is already in use
    const existingUsers = await UserModel.find().lean().select("email");
    const usedEmails = existingUsers.map((user) => user.email);
    if (usedEmails.includes(data.user.email))
      return NextResponse.json(
        { message: "User logged in", isNewUser: false },
        { status: 200 },
      );

    // If not, create new user
    const newUser = UserModel.create({
      email: data.user.email,
      username: data.user.name,
    });
    return NextResponse.json(
      { message: "User registered", isNewUser: true },
      { status: 201 },
    );
  } catch (error) {
    // Catch duplicate errors
    if (error instanceof Error && "code" in error && error.code === 11000)
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
      );

    if (error instanceof Error && error.message.includes("zod"))
      return NextResponse.json({ message: error.message }, { status: 400 });

    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
