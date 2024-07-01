import { fetchQuery } from "relay-runtime";
import { environment } from "../relay";
import { GetUserQuery } from "../graphql";
import { getUserQuery$data } from "../graphql/queries/__generated__/getUserQuery.graphql";

type Response = {
  isLogged: boolean;
  user?: any;
};

export const useAuth = async (): Promise<Response> => {
  try {
    const data = await fetchQuery(environment, GetUserQuery, {}).toPromise();
    const { edges } = (data as getUserQuery$data).GetUser;

    const user = Array.isArray(edges) ? edges[0].node : undefined;
    return {
      isLogged: true,
      user,
    };
  } catch {
    return {
      isLogged: false,
    };
  }
};
