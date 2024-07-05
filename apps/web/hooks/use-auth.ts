import { fetchQuery } from "relay-runtime";
import { environment } from "../relay";
import { GetUserQuery, Post } from "../graphql";
import { getUserQuery$data } from "../graphql/queries/user/__generated__/getUserQuery.graphql";
export interface User {
  id: string;
  description?: string;
  email: string;
  notify: boolean;
  tabcoins: number;
  username: string;
  posts: Post[];
}

type Response = {
  isLogged: boolean;
  user?: User;
};

const getUser = async (): Promise<Response> => {
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

export const useAuth = () => {
  return {
    getUser,
    isLoggedUser: (id?: string) => {
      if (!id) return false;

      const loggedUser = localStorage.getItem("tabnews.user.id");
      return id === loggedUser;
    },
  };
};
