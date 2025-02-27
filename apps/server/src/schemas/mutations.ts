import { UserMutations, PostMutations } from "../modules";
import { GraphQLObjectType } from "graphql";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
  }),
});
