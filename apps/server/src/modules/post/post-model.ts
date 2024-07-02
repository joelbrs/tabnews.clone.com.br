import { Document, Model, Schema, model } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  tabcoins: number;
  font?: string;
  slug: string;

  generateSlug(title: string): string;
}

export type PostModel = Model<IPost>;

export const PostSchema = new Schema<IPost, PostModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    creatorId: {
      type: String,
      required: true,
    },
    tabcoins: {
      type: Number,
      default: 1,
    },
    font: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    collection: "Post",
    timestamps: true,
  }
);

export const Post: PostModel = model<IPost, PostModel>("Post", PostSchema);
