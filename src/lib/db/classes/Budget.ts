import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { mongoose, prop, Ref } from "@typegoose/typegoose";
import { User } from "@/src/lib/db/classes/User";
import { Transaction } from "@/src/lib/db/classes/Transaction";
import { Category } from "@/src/lib/db/classes/Category";

class categoryTarget {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => Category })
  public category!: Ref<Category>;

  @prop({ type: Number })
  public target!: number;
}

export class Budget extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({ type: String, required: true, maxlength: 50 })
  public title!: string;

  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  public user!: Ref<User>;

  @prop({ type: String, required: true, enum: ["period", "inactive"] })
  public type!: string;

  @prop({ type: () => [categoryTarget], required: true })
  public categories!: categoryTarget[];

  @prop({
    type: () => [mongoose.Types.ObjectId],
    ref: () => Transaction,
    default: [],
  })
  public transactions!: Transaction[];
}
