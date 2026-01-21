import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, mongoose } from "@typegoose/typegoose";

export class User extends TimeStamps implements Base {
  public _id!: mongoose.Types.ObjectId;
  public id!: string;

  @prop({
    required: true,
    unique: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ ,
  })
  public email!: string;

  
}
