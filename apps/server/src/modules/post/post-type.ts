import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { IPost } from "./post-model";

export const PostTypeGQL = new GraphQLObjectType<IPost>({
  name: "Post",
  description: "Post object that represents Tabnews Posts",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents post's id",
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents post's title",
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents post's description",
    },
    createdAt: {
      type: GraphQLString,
      description: "Represents post's creation date",
    },
    updatedAt: {
      type: GraphQLString,
      description: "Represents post's last update date",
    },
    creatorId: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents post's creator identifier",
    },
    tabcoins: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Represents post's tabcoins",
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents post's slug",
    },
  }),
});
