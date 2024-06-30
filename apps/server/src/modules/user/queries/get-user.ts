import {
  ConnectionArguments,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from "graphql-relay";
import { UserTypeGQL } from "../user-type";
import { GraphQLString } from "graphql";
import { User } from "../user-model";
import { Context } from "koa";
import { validateJwt } from "@/validation";

type FindUserDtoIn = { username?: string };

const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserTypeGQL,
});

export const GetUserQuery = {
  type: UserConnection,
  args: {
    ...connectionArgs,
    username: {
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: FindUserDtoIn, ctx: Context) => {
    if (!args?.username) {
      const { subId } = validateJwt(ctx.token as string);

      const user = await User.findById(subId);
      return connectionFromArray([user], args as ConnectionArguments);
    }

    const user = await User.findOne({ username: args.username });
    return connectionFromArray([user], args as ConnectionArguments);
  },
};
