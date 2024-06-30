import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "kcors";
import Router from "koa-router";
import { graphqlHTTP } from "koa-graphql";
import { contextMiddleware } from "./middlewares";
import { GQLSchema } from "./schemas";

export const setup = () => {
  const app = new Koa();
  const router = new Router();

  router.all(
    "/graphql",
    graphqlHTTP(async (_, __, ctx) => ({
      schema: GQLSchema,
      graphiql: true,
      context: ctx.state.context,
    }))
  );

  app.use(bodyParser());
  app.use(cors({ origin: "*" }));
  app.use(contextMiddleware);

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
