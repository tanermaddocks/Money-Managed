import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, mongoose, Ref } from "@typegoose/typegoose";
import { currencyCodes } from "@/src/lib/data/currencies";
import { defaultCategories } from "@/src/lib/data/defaultCategories";

export class User extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({
    type: String,
    required: true,
    unique: true,
  })
  public email!: string;

  @prop({ type: String, required: true, minlength: 2, maxlength: 100 })
  public username!: string;

  @prop({
    type: () => [String],
    minlength: 2,
    maxlength: 20,
    default: defaultCategories,
  })
  public categories!: string[];

  @prop({ type: String, default: "AUD", enum: currencyCodes })
  public defaultCurrency?: string;
}
