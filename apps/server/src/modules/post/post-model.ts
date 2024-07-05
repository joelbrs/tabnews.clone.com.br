import { randomUUID } from "node:crypto";
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
  }
);

PostSchema.methods = {
  generateSlug(title: string) {
    return title
      ?.toLowerCase()
      ?.split(" ")
      ?.join("-")
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.replace(/[.,!?]/g, "");
  },
};

PostSchema.pre<IPost>("save", async function () {
  if (!this.slug) {
    const slug = this.generateSlug(this.title);
    const post = await Post.findOne({ slug });

    if (!post) {
      return (this.slug = slug);
    }
    this.slug = `${slug}-${randomUUID()}`;
  }
});

export const Post: PostModel = model<IPost, PostModel>("Post", PostSchema);
