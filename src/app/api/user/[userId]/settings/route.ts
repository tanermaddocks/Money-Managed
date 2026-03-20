import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/lib/db/dbConnect";
import { UserModel } from "@/src/lib/db/models";
import { userSettingsSchema } from "@/src/lib/db/schemas/user";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    // Connect to DB and resolve params
    await dbConnect();
    const { userId } = await params;

    // Parse body data
    const body: unknown = await request.json();
    const { success, data, error } = userSettingsSchema.safeParse(body);
    if (!success) {
      const errorMessage = error.issues.map((i) => i.message).join("; ");
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 },
      );
    }

    // Update record with new settings
    const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return NextResponse.json(
        { message: "Failed to find user" },
        { status: 404 },
      );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user settings" },
      { status: 500 },
    );
  }
}
