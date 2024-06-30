import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../user-model";
import { EntityNotFoundException, UnauthorizedException } from "@/exceptions";

export type LoginUserDtoIn = {
  email: string;
  password: string;
};

export const LoginUserMutation = mutationWithClientMutationId({
  name: "LoginUser",
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ password, email }: LoginUserDtoIn) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new EntityNotFoundException("User");
    }

    const passwordMatches = await user.comparePassword(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const token = user.generateJwt(user);

    return {
      userId: user._id,
      token,
    };
  },
  outputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (payload) => (await payload)?.userId,
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (payload) => (await payload)?.token,
    },
  },
});
