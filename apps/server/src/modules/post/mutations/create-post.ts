import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { IPost, Post } from "../post-model";
import { Context } from "koa";
import { PostTypeGQL } from "../post-type";
import { validateJwt } from "@/validation";
import { User } from "@/modules/user";

export type CreatePostInput = Pick<
  IPost,
  "title" | "description" | "creatorId" | "font"
>;

const DEFAULT_TABCOINS_WHEN_POST_IS_CREATED = 5;

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

    const user = await User.findById(creatorId);

    if (user) {
      user.tabcoins += DEFAULT_TABCOINS_WHEN_POST_IS_CREATED;
      await user.save();
    }
    return { post };
  },
  outputFields: {
    post: {
      type: PostTypeGQL,
      resolve: async (payload) => (await payload)?.post,
    },
  },
});
