import { GraphQLInt, GraphQLString } from "graphql";
import {
  ConnectionArguments,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from "graphql-relay";
import { Post, PostTypeGQL } from "..";

type GetPostsDtoIn = { page?: number; limit?: number; slug?: number };

const { connectionType: PostConnection } = connectionDefinitions({
  nodeType: PostTypeGQL,
});

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 30;

export const GetPostsQuery = {
  type: PostConnection,
  args: {
    ...connectionArgs,
    page: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    },
    slug: {
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: GetPostsDtoIn) => {
    const page = args.page || DEFAULT_PAGE;
    const limit = args.limit || DEFAULT_LIMIT;

    let posts;

    if (args.slug) {
      posts = Post.findOne({ slug: args.slug });
      return connectionFromArray([posts], args as ConnectionArguments);
    }

    posts = await Post.find()
      .limit(limit)
      .skip(page * limit)
      .sort("created_at");
    return connectionFromArray(posts, args as ConnectionArguments);
  },
};
