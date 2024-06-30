import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { UserTypeGQL } from "../user-type";
import { IUser, User } from "../user-model";

export type CreateUserDtoIn = Pick<
  IUser,
  "username" | "email" | "description" | "password" | "notify" | "tabcoins"
> & { password_confirmation: string };

export const CreateUserMutation = mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (data: CreateUserDtoIn) => {
    try {
      const user = await User.create(data);

      return {
        user,
      };
    } catch (err) {
      throw err;
    }
  },
  outputFields: {
    user: {
      type: UserTypeGQL,
      resolve: async (payload) => (await payload)?.user,
    },
  },
});
