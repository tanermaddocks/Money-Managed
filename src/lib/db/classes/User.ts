import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, mongoose, Ref } from "@typegoose/typegoose";
import { Category } from "@/src/lib/db/classes/Category";
import { currencyCodes } from "@/src/lib/data/currencies";

export class User extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({
    required: true,
    unique: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  })
  public email!: string;
  // other auth info to be determined after setup of NextAuth

  @prop({
    type: () => [mongoose.Types.ObjectId],
    ref: () => Category,
    default: [],
  })
  public customCategories?: Ref<Category>[];

  @prop({ type: String, required: true, enum: currencyCodes })
  public defaultCurrency?: string;
}
