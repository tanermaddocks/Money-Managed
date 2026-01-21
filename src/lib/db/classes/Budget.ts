import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses"
import * as typegoose from "@typegoose/typegoose"

export class Budget extends TimeStamps implements Base {
 public _id!: typegoose.mongoose.Types.ObjectId;
 public id!: string;

}