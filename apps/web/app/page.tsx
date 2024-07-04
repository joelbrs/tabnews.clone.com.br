"use client";

import { useEffect, useState } from "react";
import { fetchQuery } from "relay-runtime";
import { environment } from "../relay";
import { GetPostsQuery, Post } from "../graphql";
import { getPostsQuery$data } from "../graphql/queries/posts/__generated__/getPostsQuery.graphql";
import PublishCard from "../components/publish-card";
import { Footer } from "../components";
import PaginationField, { Pagination } from "../components/pagination";

export default function Page(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    hasNextPage: false,
  });

  useEffect(() => {
    async function getPosts() {
      const data = await fetchQuery(environment, GetPostsQuery, {
        page: pagination.page,
        relevants: true,
      }).toPromise();

      const { edges, pageInfo } = (data as getPostsQuery$data).GetPosts;

      const posts = Array.isArray(edges) && edges?.map((item) => item?.node);
      const page = { page: pagination.page, hasNextPage: pageInfo.hasNextPage };

      setPosts(posts || []);
      setPagination(page);
    }

    getPosts();
  }, [pagination.page]);

  return (
    <main className="flex flex-col items-center justify-center py-8 gap-10">
      <div className="flex flex-col sm:items-start sm:justify-start gap-3 pb-5 sm:pb-3.5 sm:w-[60vw] px-2">
        <PublishCard posts={posts} />

        <div className="self-center">
          <PaginationField
            onNextPage={(page: number) => {
              setPagination({ page, hasNextPage: pagination.hasNextPage });
            }}
            onPreviousPage={(page: number) => {
              setPagination({ page, hasNextPage: pagination.hasNextPage });
            }}
            pagination={pagination}
          />
        </div>
      </div>

      <Footer className="w-[60vw]" />
    </main>
  );
}
