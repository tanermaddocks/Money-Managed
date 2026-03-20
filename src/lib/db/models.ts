import {
  getModelForClass,
  ReturnModelType,
  mongoose,
} from "@typegoose/typegoose";
import { User } from "@/src/lib/db/classes/User";
import { Transaction } from "@/src/lib/db/classes/Transaction";

export const UserModel: ReturnModelType<typeof User> =
  (mongoose.models.User as ReturnModelType<typeof User>) ||
  getModelForClass(User);

export const TransactionModel: ReturnModelType<typeof Transaction> =
  (mongoose.models.Transaction as ReturnModelType<typeof Transaction>) ||
  getModelForClass(Transaction);
