"use client";

import { useEffect, useState } from "react";
import { fetchQuery } from "relay-runtime";
import { environment } from "../../../relay";
import { GetPostsQuery, Post } from "../../../graphql";
import { getPostsQuery$data } from "../../../graphql/queries/posts/__generated__/getPostsQuery.graphql";
import { usePathname } from "next/navigation";
import { Footer, MenuActions, ViewerMarkdown } from "../../../components";
import VotePost from "../../../components/vote-post";
import Link from "next/link";
import { DropdownMenuItem } from "@repo/ui/components";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks";

export default function PostPage(): JSX.Element {
  const [post, setPost] = useState<Post>();
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [key, setKey] = useState(0);

  const auth = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    async function getPost() {
      const [_, __, slug] = pathname.split("/");

      const data = await fetchQuery(environment, GetPostsQuery, {
        slug,
      }).toPromise();
      const { edges } = (data as getPostsQuery$data).GetPosts;

      const post = Array.isArray(edges) ? edges[0].node : undefined;

      if (auth.isLoggedUser(post?.user.id)) {
        setIsLoggedUser(true);
      }

      setPost(post);
      setKey(key + 1);
    }

    getPost();
  }, [pathname]);

  return (
    <main className="space-y-10">
      <section className="flex items-start justify-center my-6">
        <VotePost post={post} key={key} />
        <div className="flex flex-col items-center justify-center sm:w-[55vw]">
          <div className="flex items-center justify-between gap-2 self-start px-2 text-xs mb-1 w-full">
            <Link
              href={`/${post?.user.username}`}
              className="self-start px-3 py-0.5 rounded-md text-blue-500 font-mono dark:bg-[#121D2F] bg-cyan-100 hover:underline hover:cursor-pointer"
            >
              {post?.user.username}
            </Link>

            {isLoggedUser && (
              <MenuActions>
                <div>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer text-destructive dark:text-red-500 hover:text-red-400">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </div>
              </MenuActions>
            )}
          </div>
          <div className="flex flex-col items-center justify-start gap-3">
            <h1 className="text-3xl font-medium self-start px-2 mb-1 leading-relaxed sm:leading-normal">
              {post?.title}
            </h1>

            <div className="justify-center pr-5 pl-2 sm:w-[55vw]">
              <ViewerMarkdown value={post?.description} />
            </div>
          </div>
        </div>
      </section>
      <Footer className="w-[55vw]" />
    </main>
  );
}
