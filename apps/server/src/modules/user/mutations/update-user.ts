import { GraphQLBoolean, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { UserTypeGQL } from "../user-type";
import { Context } from "koa";
import { IUser, User } from "../user-model";
import { validateJwt } from "../../../validation";

export type UpdateUserDtoIn = Pick<
  IUser,
  "username" | "description" | "notify" | "email"
>;

export const UpdateUserMutation = mutationWithClientMutationId({
  name: "UpdateUser",
  inputFields: {
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    notify: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: async (data: UpdateUserDtoIn, ctx: Context) => {
    const { username } = validateJwt(ctx.token as string);

    const user = await User.findOneAndUpdate(
      { username },
      {
        email: data?.email ?? undefined,
        username: data?.username ?? undefined,
        description: data?.description ?? undefined,
        notify: data?.notify ?? undefined,
      },
      { new: true }
    );
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
