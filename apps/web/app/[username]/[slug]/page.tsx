"use client";

import { useEffect, useState } from "react";
import { fetchMutation } from "../../../relay";
import { DeletePostMutation, Post } from "../../../graphql";
import { usePathname, useRouter } from "next/navigation";
import {
  DialogConfirm,
  Footer,
  MenuActions,
  ViewerMarkdown,
} from "../../../components";
import VotePost from "../../../components/vote-post";
import Link from "next/link";
import { DropdownMenuItem, Skeleton, useToast } from "@repo/ui/components";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks";
import { getPost } from "./get-post";
import { useMutation } from "react-relay";

export default function PostPage(): JSX.Element {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [key, setKey] = useState(0);

  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [request] = useMutation(DeletePostMutation);

  useEffect(() => {
    async function detail() {
      const [_, __, slug] = pathname.split("/");

      const post = await getPost(slug);
      setIsLoading(false)

      if (auth.isLoggedUser(post?.user.id)) {
        setIsLoggedUser(true);
      }

      setPost(post);
      if (post?.font) {
        setPost({...post, description: post.description?.concat(`#### Fonte: ${post.font}`)});
      }

      setKey(key + 1);
    }

    detail();
  }, [pathname]);

  const excluirPost = async () => {
    const [_, __, slug] = pathname.split("/");

    const variables = {
      slug,
    };

    fetchMutation({
      request,
      toast,
      variables,
      onCompleted: () => {
        router.push("/");
      },
    });
  };

  return (
    <main className="space-y-10 pb-10">
      <section className="flex items-start justify-center my-6">
        <div className="flex items-center flex-col">
          <VotePost post={post} key={key} loading={isLoading}/>
        </div>
        <div className="flex flex-col items-center justify-center sm:w-[55vw]">
          <div className="flex items-center justify-between gap-2 self-start px-2 text-xs mb-1 w-full">
            {!isLoading && <Link
              href={`/${post?.user.username}`}
              className="self-start px-3 py-0.5 rounded-md text-blue-500 font-mono dark:bg-[#121D2F] bg-cyan-100 hover:underline hover:cursor-pointer"
            >
              {post?.user.username}
            </Link> || <Skeleton className="h-4 w-[80px]"/>}

            {isLoggedUser && (
              <MenuActions>
                <div>
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => {
                      router.push(`${pathname}/editar`);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DialogConfirm
                    title="Tem certeza que deseja excluir o post?"
                    description="Esta ação não poderá ser desfeita."
                    onConfirm={() => excluirPost()}
                    loading={true}
                  >
                    <DropdownMenuItem
                      onSelect={($event) => $event.preventDefault()}
                      className="hover:cursor-pointer text-destructive dark:text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DialogConfirm>
                </div>
              </MenuActions>
            )}
          </div>
          <div className="flex flex-col items-center justify-start gap-3">
            {!isLoading && <h1 className="text-3xl font-medium self-start px-2 mb-1 leading-relaxed sm:leading-normal">
              {post?.title}
            </h1> || 
            <div className="space-y-1">
              <Skeleton className="h-4 w-[92vw] sm:w-[1040px]"/>
              <Skeleton className="h-4 w-[42vw] sm:w-[350px]"/>
            </div>
            }

            <div className="justify-center pr-5 pl-2 sm:w-[55vw]">
              <ViewerMarkdown value={post?.description || ""} loading={isLoading}/>
            </div>
          </div>
        </div>
      </section>
      <Footer className="w-[55vw]" />
    </main>
  );
}
