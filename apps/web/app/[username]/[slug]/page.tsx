"use client";

import { useEffect, useState } from "react";
import { fetchQuery } from "relay-runtime";
import { environment } from "../../../relay";
import { GetPostsQuery } from "../../../graphql";
import { getPostsQuery$data } from "../../../graphql/queries/posts/__generated__/getPostsQuery.graphql";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Footer } from "../../../components";
import VotePost from "../../../components/vote-post";
import Link from "next/link";

export default function PostPage(): JSX.Element {
  const [post, setPost] = useState<any>();
  const [key, setKey] = useState(0)

  const { theme } = useTheme();

  const pathname = usePathname();

  useEffect(() => {
    async function getPost() {
      const [_, __, slug] = pathname.split("/");

      const data = await fetchQuery(environment, GetPostsQuery, {
        slug,
      }).toPromise();
      const { edges } = (data as getPostsQuery$data).GetPosts;

      setPost(Array.isArray(edges) ? edges[0].node : undefined);
      setKey(key + 1)
    }

    getPost();
  }, [pathname]);

  return (
    <main className="space-y-10">
      <section className="flex items-start justify-center my-6">
        <VotePost post={post} key={key} />
        <div className="flex flex-col items-center justify-center sm:w-[55vw]">
          <div className="flex items-center justify-start gap-2 self-start px-2 text-xs mb-1">
            <Link
              href={`/${post?.user.username}`}
              className="self-start px-3 py-0.5 rounded-md text-blue-500 font-mono dark:bg-[#121D2F] bg-cyan-100 hover:underline hover:cursor-pointer"
            >
              {post?.user.username}
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start gap-3">
            <h1 className="text-3xl font-medium self-start px-2 mb-1 leading-relaxed sm:leading-normal">
              {post?.title}
            </h1>

            <div className="justify-center pr-5 pl-2 sm:w-[55vw]">
              <MarkdownPreview
                source={post?.description}
                style={
                  theme === "light"
                    ? { background: "#FFF", color: "#000" }
                    : { backgroundColor: "#020817" }
                }
              />
            </div>
          </div>
        </div>
      </section>
      <Footer className="w-[50vw]" />
    </main>
  );
}
