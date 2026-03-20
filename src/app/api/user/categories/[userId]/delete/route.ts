import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/lib/db/dbConnect";
import { TransactionModel, UserModel } from "@/src/lib/db/models";
import { userEditCategoriesSchema } from "@/src/lib/db/schemas/user";

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
    const { success, data, error } = userEditCategoriesSchema.safeParse(body);

    if (!success) {
      const errorMessage = error.issues.map((i) => i.message).join("; ");
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    // Check if user has a matching category

    const userToUpdate = await UserModel.findById(userId)
      .lean()
      .select("categories");

    if (!userToUpdate)
      return NextResponse.json(
        { message: "Failed to find user" },
        { status: 404 },
      );

    if (!userToUpdate.categories.includes(data.category))
      return NextResponse.json({ message: "Category does not exist" });

    // Check if category is in use

    const categoryInUse = await TransactionModel.find({
      category: data.category,
      user: userId,
    }).lean();

    if (categoryInUse.length > 0)
      return NextResponse.json(
        { message: "Category currently in use - cannot delete" },
        { status: 403 },
      );

    // Delete category from user

    const userCategories: string[] = [];
    userToUpdate.categories.map((category) => {
      if (category && category != data.category) userCategories.push(category);
    });

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { categories: userCategories },
      { new: true, runValidators: true },
    )
      .lean()
      .select("username categories");

    if (!updatedUser)
      return NextResponse.json(
        { message: "Failed to find and update user" },
        { status: 404 },
      );

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user categories" },
      { status: 500 },
    );
  }
}
