import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Context } from "koa";
import { Post } from "../post-model";
import { EntityNotFoundException, UnauthorizedException } from "@/exceptions";
import { validateJwt } from "@/validation";
import { User } from "@/modules/user";
import { DEFAULT_TABCOINS_WHEN_POST_IS_CREATED } from "./create-post";

export type DeletePostInput = {
  slug: string;
};

export const DeletePostMutation = mutationWithClientMutationId({
  name: "DeletePost",
  inputFields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ slug }: DeletePostInput, ctx: Context) => {
    const { subId } = validateJwt(ctx.token as string);

    const post = await Post.findOne({ slug });

    if (!post) {
      throw new EntityNotFoundException("Post");
    }

    if (post.creatorId !== subId?.toString()) {
      throw new UnauthorizedException();
    }

    await Post.deleteOne({ slug });

    const creator = await User.findById(subId);

    if (creator) {
      if (post.tabcoins >= 1) {
        creator.tabcoins -=
          post.tabcoins - DEFAULT_TABCOINS_WHEN_POST_IS_CREATED - 1;
        await creator.save();
      }
    }

    return {
      success: true,
    };
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: async (payload) => (await payload)?.success,
    },
  },
});
