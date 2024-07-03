import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import {
  ConnectionArguments,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from "graphql-relay";
import { Post, PostTypeGQL } from "..";

type GetPostsDtoIn = {
  page?: number;
  limit?: number;
  slug?: number;
  relevants?: boolean;
};

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
    relevants: {
      type: GraphQLBoolean,
    },
  },
  resolve: async (_: any, args: GetPostsDtoIn) => {
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      slug,
      relevants,
    } = args;
    let posts;

    if (slug) {
      posts = await Post.findOne({ slug });
      return connectionFromArray([posts], args as ConnectionArguments);
    }

    const totalCount = await Post.countDocuments();

    const skip = page * limit;

    posts = await Post.find()
      .limit(limit)
      .skip(skip)
      .sort(relevants ? { tabcoins: -1, createdAt: -1 } : { createdAt: -1 });

    const connection = connectionFromArray(posts, args as ConnectionArguments);

    connection.pageInfo.hasNextPage = skip + limit < totalCount;
    connection.pageInfo.hasPreviousPage = skip > 0;

    return connection;
  },
};
