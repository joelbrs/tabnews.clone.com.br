import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { UserTypeGQL } from "../user-type";
import { Context } from "koa";
import { IUser, User } from "../user-model";
import { validateJwt } from "@/validation";

export type UpdateUserDtoIn = Pick<
  IUser,
  "username" | "description" | "notify"
>;

export const UpdateUserMutation = mutationWithClientMutationId({
  name: "UpdateUser",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    notify: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  mutateAndGetPayload: async (data: UpdateUserDtoIn, ctx: Context) => {
    const { username } = validateJwt(ctx.token as string);

    const user = await User.findOneAndUpdate({ username }, data, { new: true });
    return {
      user,
    };
  },
  outputFields: {
    user: {
      type: UserTypeGQL,
      resolve: async (payload) => (await payload)?.user,
    },
  },
});
