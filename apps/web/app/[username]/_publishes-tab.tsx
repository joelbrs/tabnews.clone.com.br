"use client";

import { Button } from "@repo/ui/components";
import { Plus, User } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import PublishCard from "../../components/publish-card";

interface Props {
  posts?: any[];
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

export function PublishesTab({ posts }: Props): JSX.Element {
  const router = useRouter();

  return (
    <>
      {!posts || (!posts.length && RenderPublishesNotFound(router)) || (
        <div className="space-y-2">
          <PublishCard posts={posts} />
        </div>
      )}
    </>
  );
}
