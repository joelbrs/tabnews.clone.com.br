import { mutationWithClientMutationId } from "graphql-relay";
import { Post } from "../post-model";
import { Context } from "koa";
import { PostTypeGQL } from "../post-type";
import { validateJwt } from "@/validation";
import { GraphQLEnumType, GraphQLNonNull, GraphQLString } from "graphql";
import { BusinessException, EntityNotFoundException } from "@/exceptions";
import { IUser, User } from "@/modules";

export type VotePostInput = {
  type: "UPVOTE" | "DOWNVOTE";
  slug: string;
};

export const VotePostMutation = mutationWithClientMutationId({
  name: "VotePost",
  inputFields: {
    type: {
      type: new GraphQLEnumType({
        name: "VoteTypeEnum",
        values: {
          UPVOTE: {
            value: "UPVOTE",
          },
          DOWNVOTE: {
            value: "DOWNVOTE",
          },
        },
      }),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ type, slug }: VotePostInput, ctx: Context) => {
    const { subId } = validateJwt(ctx.token as string);

    const post = await Post.findOne({ slug });

    if (!post) {
      throw new EntityNotFoundException("Post");
    }

    if (subId?.toString() === post.creatorId?.toString()) {
      throw new BusinessException("User cannot vote in your own post.");
    }

    const user = await User.findById(subId);

    if (Number(user?.tabcoins) < 2) {
      throw new BusinessException("User's tabcoins are insufficient.");
    }

    const author = await User.findById(post.creatorId);

    if (type === "UPVOTE") {
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
