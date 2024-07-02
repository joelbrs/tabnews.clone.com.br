import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { IPost, Post } from "../post-model";
import { Context } from "koa";
import { PostTypeGQL } from "../post-type";
import { validateJwt } from "@/validation";

export type CreatePostInput = Pick<
  IPost,
  "title" | "description" | "creatorId" | "font"
>;

export const CreatePostMutation = mutationWithClientMutationId({
  name: "CreatePost",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    font: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (data: CreatePostInput, ctx: Context) => {
    const { subId: creatorId } = validateJwt(ctx.token as string);

    const post = await Post.create({ ...data, creatorId: `${creatorId}` });
    return { post };
  },
  outputFields: {
    post: {
      type: PostTypeGQL,
      resolve: async (payload) => (await payload)?.post,
    },
  },
});
