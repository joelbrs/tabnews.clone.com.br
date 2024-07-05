import { PostsQueries, UserQuery } from "../modules";
import { GraphQLObjectType } from "graphql";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...UserQuery,
    ...PostsQueries,
  }),
});
