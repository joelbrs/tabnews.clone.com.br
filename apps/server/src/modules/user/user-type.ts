import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { IUser } from "./user-model";

export const UserTypeGQL = new GraphQLObjectType<IUser>({
  name: "User",
  description: "User object that represents Tabnews Users",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents user's id",
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents user's username",
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents user's email",
    },
    description: {
      type: GraphQLString,
      description: "Represents user's description",
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Represents user's password",
    },
    notify: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Represents user's preferences about email notifications",
    },
    tabcoins: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Represents user's tabcoins",
    },
    createdAt: {
      type: GraphQLString,
      description: "Represents post's creation date",
    },
    updatedAt: {
      type: GraphQLString,
      description: "Represents post's last update date",
    },
  }),
});
