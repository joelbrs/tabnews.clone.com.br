import { GraphQLSchema } from "graphql";
import { MutationType } from "./mutations";
import { QueryType } from "./queries";

export const GQLSchema = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
