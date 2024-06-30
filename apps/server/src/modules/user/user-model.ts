import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { env } from "@/config";

export interface IUser extends Document {
  username: string;
  email?: string;
  description?: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  notify: boolean;
  tabcoins: number;

  hashPassword(password: string): Promise<string>;
}

export type UserModel = Model<IUser>;

const DEFAULT_TABCOINS = 5;

const UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      minlength: 4,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    created_at: {
      type: Date,
      default: new Date(),
    },
    updated_at: {
      type: Date,
      default: new Date(),
    },
    notify: {
      type: Boolean,
      required: true,
      default: true,
    },
    tabcoins: {
      type: Number,
      default: DEFAULT_TABCOINS,
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

UserSchema.methods = {
  hashPassword: (password: string) => {
    return bcrypt.hash(password, env.HASH_SALT);
  },
};

UserSchema.pre<IUser>("save", async function () {
  if (this.isModified("password")) {
    this.password = await this.hashPassword(this.password);
  }
});

export const User: UserModel = model<IUser, UserModel>("User", UserSchema);
