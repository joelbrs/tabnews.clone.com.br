import { UserMutations } from "@/modules";
import { PostMutations } from "@/modules/post";
import { GraphQLObjectType } from "graphql";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
  }),
});
