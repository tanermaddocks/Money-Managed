import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { mongoose, prop, Ref } from "@typegoose/typegoose";
import { currencyCodes } from "@/src/lib/data/currencies";
import { User } from "@/src/lib/db/classes/User";

export class Asset extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({ type: String, required: true, enum: currencyCodes })
  public currency!: (typeof currencyCodes)[number];

  @prop({ type: String, required: true })
  public date!: Date;

  @prop({ type: String, maxlength: 100, trim: true })
  public description?: string; // max length: 100, trim: true

  @prop({
    type: mongoose.Types.ObjectId,
    ref: () => User,
    required: true,
  })
  public user!: Ref<User>;

  @prop({ type: Number, required: true })
  public value!: number;
}
