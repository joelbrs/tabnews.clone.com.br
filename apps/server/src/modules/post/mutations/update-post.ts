import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Context } from "koa";
import { CreatePostInput } from "./create-post";
import { Post } from "../post-model";
import { EntityNotFoundException, UnauthorizedException } from "@/exceptions";
import { validateJwt } from "@/validation";
import { PostTypeGQL } from "../post-type";

export type UpdatePostInput = Omit<CreatePostInput, "creatorId"> & {
  slug: string;
};

export const UpdatePostMutation = mutationWithClientMutationId({
  name: "UpdatePost",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    font: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (
    { slug, ...data }: UpdatePostInput,
    ctx: Context
  ) => {
    const { subId } = validateJwt(ctx.token as string);

    const post = await Post.findOne({ slug });

    if (!post) {
      throw new EntityNotFoundException("Post");
    }

    if (post.creatorId !== subId?.toString()) {
      throw new UnauthorizedException();
    }

    await Post.updateOne({ slug }, data);

    return {
      post: {
        ...data,
        slug,
        id: post.slug,
      },
    };
  },
  outputFields: {
    post: {
      type: PostTypeGQL,
      resolve: async (payload) => (await payload)?.post,
    },
  },
});
