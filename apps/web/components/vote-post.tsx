"use client"

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, toast } from "@repo/ui/components";
import { useMutation } from "react-relay";
import { VotePostMutation, VoteTypeEnum } from "../graphql";
import { useState } from "react";
import { votePostMutation$data } from "../graphql/mutations/post/__generated__/votePostMutation.graphql";

export interface Props {
  post: any;
}

export default function VotePost({ post }: Props): JSX.Element {
  const [tabcoins, setTabcoins] = useState(post?.tabcoins)
  const [request] = useMutation(VotePostMutation)

  const onVote = (type: VoteTypeEnum) => {
    request({
      variables: {
        slug: post.slug,
        type
      },
      onCompleted: (response, errors) => {
        if (errors?.length) {
          toast({
            title: "Atenção",
            description: errors[0]?.message,
            variant: "warning",
          });
          return;
        }

        setTabcoins((response as votePostMutation$data)?.VotePost.post?.tabcoins)
        toast({
          title: "Sucesso!",
          description: "Salvo com sucesso.",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado.",
          variant: "destructive",
        });
      }
    },)
  }

  return (
    <div className="flex flex-col items-center gap-1 sm:max-w-[50vw]">
      <Button variant="ghost" className="p-2" title="Achei relevante" onClick={() => onVote(VoteTypeEnum.UPVOTE)}>
        <ChevronUp className="text-muted-foreground w-4 h-4" />
      </Button>
      <span className="text-blue-500 font-medium text-sm">
        {tabcoins}
      </span>
      <Button variant="ghost" className="p-2" title="Não achei relevante" onClick={() => onVote(VoteTypeEnum.DOWNVOTE)}>
        <ChevronDown className="text-muted-foreground w-4 h-4" />
      </Button>
    </div>
  );
}
