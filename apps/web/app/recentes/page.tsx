"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { User } from "lucide-react";
import PublishCard from "../../components/publish-card";
import PaginationField, { Pagination } from "../../components/pagination";
import { useEffect, useState } from "react";
import { fetchQuery } from "relay-runtime";
import { environment } from "../../relay";
import { GetPostsQuery, Post } from "../../graphql";
import { getPostsQuery$data } from "../../graphql/queries/posts/__generated__/getPostsQuery.graphql";
import { Footer, PublishCardSkeleton } from "../../components";

export default function RecentsPage(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    hasNextPage: false,
  });

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      const data = await fetchQuery(environment, GetPostsQuery, {
        page: pagination.page,
      }).toPromise();
      setIsLoading(false);

      const { edges, pageInfo } = (data as getPostsQuery$data).GetPosts;

      const posts = Array.isArray(edges) && edges?.map((item) => item?.node);
      const page = { page: pagination.page, hasNextPage: pageInfo.hasNextPage };

      setPosts(posts || []);
      setPagination(page);
    }

    getPosts();
  }, [pagination.page]);

  return (
    <main className="flex flex-col gap-10 items-center justify-center pt-8">
      <Tabs>
        <TabList>
          <Tab>Publicações</Tab>
          <Tab>Comentários</Tab>
        </TabList>

        <TabPanel className="w-[60vw]">
          <div className="flex flex-col sm:items-start sm:justify-start gap-3 pb-5 sm:pb-3.5 sm:w-[70vw] px-2">
            {(!isLoading && <PublishCard posts={posts} />) || (
              <PublishCardSkeleton />
            )}

            <div className="self-center">
              <PaginationField
                disabled={isLoading}
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
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col gap-2 items-center justify-center mt-10">
            <User className="w-10 h-10" />
            <h3 className="text-xl font-medium">
              Nenhum comentário encontrado
            </h3>
          </div>
        </TabPanel>
      </Tabs>

      <Footer className="w-[50vw]" />
    </main>
  );
}
