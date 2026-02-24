import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { mongoose, prop, Ref } from "@typegoose/typegoose";
import { Category } from "@/src/lib/db/classes/Category";
import { currencyCodes } from "@/src/lib/data/currencies";
import { User } from "@/src/lib/db/classes/User";

export class Transaction extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({
    type: mongoose.Types.ObjectId,
    ref: () => Category,
    required: true,
  })
  public category!: Ref<Category>;

  @prop({ type: String, required: true, enum: currencyCodes })
  public currency!: string;

  @prop({ type: String, required: true })
  public date!: Date;

  @prop({ type: String, maxlength: 100, trim: true })
  public description?: string; // max length: 100, trim: true

  @prop({ type: String, required: true, enum: ["income", "expense"] })
  public type!: string;

  @prop({
    type: mongoose.Types.ObjectId,
    ref: () => User,
    required: true,
  })
  public user!: Ref<User>;

  @prop({ type: Number, required: true })
  public value!: number;
}
