"use client";

import { useEffect, useState } from "react";
import { fetchQuery } from "relay-runtime";
import { environment } from "../relay";
import { GetPostsQuery } from "../graphql";
import { getPostsQuery$data } from "../graphql/queries/posts/__generated__/getPostsQuery.graphql";
import PublishCard from "../components/publish-card";
import { Footer } from "../components";

export default function Page(): JSX.Element {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function getPosts() {
      const data = await fetchQuery(environment, GetPostsQuery, {}).toPromise();

      const { edges } = (data as getPostsQuery$data).GetPosts;
      setPosts(Array.isArray(edges) ? edges?.map((item) => item?.node) : []);
    }

    {
      /**TODO: change it to pagination */
    }
    if (!posts.length) {
      getPosts();
    }
  }, [posts]);

  return (
    <main className="flex flex-col items-center justify-center py-8 gap-10">
      <div className="flex flex-col sm:items-start sm:justify-start gap-3 pb-5 sm:pb-3.5 sm:w-[70vw] px-2">
        <PublishCard posts={posts} />
      </div>

      <Footer className="w-[70vw]" />
    </main>
  );
}
