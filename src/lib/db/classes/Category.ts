import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { mongoose, prop } from "@typegoose/typegoose";

export class Category extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({ type: String, maxlength: 200 })
  public description?: string;

  @prop({ type: String, required: true, maxlength: 50 })
  public title!: string;

  @prop({type: Boolean, default: false})
  public global!: boolean
}
