import { mutationWithClientMutationId } from "graphql-relay";
import { Post } from "../post-model";
import { Context } from "koa";
import { PostTypeGQL } from "../post-type";
import { validateJwt } from "@/validation";
import { GraphQLEnumType, GraphQLNonNull, GraphQLString } from "graphql";
import { BusinessException, EntityNotFoundException } from "@/exceptions";
import { IUser, User } from "@/modules";

export type VotePostInput = {
  type: "increment" | "decrement";
  id: string;
};

export const VotePostMutation = mutationWithClientMutationId({
  name: "VotePost",
  inputFields: {
    type: {
      type: new GraphQLEnumType({
        name: "VoteType",
        values: {
          increment: {
            value: "increment",
          },
          decrement: {
            value: "decrement",
          },
        },
      }),
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ type, id }: VotePostInput, ctx: Context) => {
    const { subId } = validateJwt(ctx.token as string);

    const post = await Post.findOne({ id });

    if (!post) {
      throw new EntityNotFoundException("Post");
    }

    const user = await User.findOne({ id: subId });

    if (Number(user?.tabcoins) < 2) {
      throw new BusinessException("User's tabcoins are insufficient.");
    }

    const author = await User.findOne({ id: post.creatorId });

    if (type === "increment") {
      post.tabcoins++;
      (author as IUser).tabcoins++;
    } else {
      post.tabcoins--;
      (author as IUser).tabcoins--;
    }
    (user as IUser).tabcoins -= 2;

    await Promise.all([post.save(), user?.save(), author?.save()]);
    return { post };
  },
  outputFields: {
    post: {
      type: PostTypeGQL,
      resolve: async (payload) => (await payload)?.post,
    },
  },
});
