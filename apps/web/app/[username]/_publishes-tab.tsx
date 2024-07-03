"use client";

import { Button } from "@repo/ui/components";
import { Plus, User } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as IUser } from "../../hooks";
import PublishCard from "../../components/publish-card";

interface Props {
  user?: IUser;
}

function RenderPublishesNotFound(router: AppRouterInstance): JSX.Element {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-10">
      <User className="w-10 h-10" />
      <h3 className="text-xl font-medium">Nenhuma publicação encontrada</h3>
      <span>Você ainda não fez nenhuma publicação.</span>

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
    </div>
  );
}

export function PublishesTab({ user }: Props): JSX.Element {
  const router = useRouter();

  return (
    <>
      {!user?.posts ||
        (!user.posts.length && RenderPublishesNotFound(router)) || (<PublishCard user={user}/>)}
    </>
  );
}
