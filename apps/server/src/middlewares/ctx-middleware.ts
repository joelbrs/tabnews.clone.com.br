import { Context, Next } from "koa";

export const contextMiddleware = async (ctx: Context, next: Next) => {
  const authorization = ctx.request.headers["authorization"];

  const token = authorization?.replace("Bearer ", "");

  ctx.state.context = {
    token,
    headers: ctx.request.headers,
  };

  await next();
};
