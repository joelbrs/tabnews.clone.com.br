import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Context } from "koa";
import { Post } from "../post-model";
import { EntityNotFoundException, UnauthorizedException } from "@/exceptions";
import { validateJwt } from "@/validation";

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

    return {
      success: true,
    };
  },
  outputFields: {
    post: {
      type: GraphQLBoolean,
      resolve: async (payload) => (await payload)?.success,
    },
  },
});
