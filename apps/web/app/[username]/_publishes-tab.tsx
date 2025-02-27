"use client";

import { Button } from "@repo/ui/components";
import { Plus, User } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import PublishCard from "../../components/publish-card";
import { User as IUser, useAuth } from "../../hooks";
import { PublishCardSkeleton } from "../../components";

interface Props {
  user?: IUser;
  loading?: boolean
}

function RenderPublishesNotFound(
  router: AppRouterInstance,
  { id, username }: IUser
): JSX.Element {
  const auth = useAuth();

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-10">
      <User className="w-10 h-10" />
      <h3 className="text-xl font-medium">Nenhuma publicação encontrada</h3>
      {(auth.isLoggedUser(id) && (
        <>
          <span className="text-center">
            Você ainda não fez nenhuma publicação.
          </span>
          <Button
            className="h-8 mt-2"
            variant="outline"
            onClick={() => {
              router.push("/publicar");
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Publicar Conteúdo
          </Button>
        </>
      )) || (
        <span className="text-center">
          {username} ainda não fez nenhuma publicação
        </span>
      )}
    </div>
  );
}

export function PublishesTab({ user, loading }: Props): JSX.Element {
  const router = useRouter();

  return (
    <>
      {!user?.posts ||
        (!user.posts.length && RenderPublishesNotFound(router, user)) || (
          <div className="space-y-2">
            {/* <PublishCard posts={user.posts} /> */}
            {(!loading && <PublishCard posts={user.posts} />) || (
              <PublishCardSkeleton />
            )}
          </div>
        )}
    </>
  );
}
