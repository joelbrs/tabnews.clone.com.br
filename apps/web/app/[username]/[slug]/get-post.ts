import { fetchQuery } from "relay-runtime";
import { environment } from "../../../relay";
import { GetPostsQuery, Post } from "../../../graphql";
import { getPostsQuery$data } from "../../../graphql/queries/posts/__generated__/getPostsQuery.graphql";

export const getPost = async (slug?: string) => {
  if (!slug) return undefined;

  const data = await fetchQuery(environment, GetPostsQuery, {
    slug,
  }).toPromise();
  const { edges } = (data as getPostsQuery$data).GetPosts;

  const post = Array.isArray(edges) ? edges[0].node : undefined;
  return post as Post;
};
