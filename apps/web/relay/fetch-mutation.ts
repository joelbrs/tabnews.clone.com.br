import { ToastType } from "@repo/ui/components";
import { UseMutationConfig } from "react-relay";
import { MutationParameters } from "relay-runtime";

type ToastInstance = (_: ToastType) => void;

type Props<T> = {
  variables: Object;
  toast: ToastInstance;
  request: (_: UseMutationConfig<MutationParameters>) => void;
  onCompleted?: (_: T) => void;
};

export const fetchMutation = <T>({
  request,
  toast,
  variables,
  onCompleted,
}: Props<T>) => {
  request({
    variables,
    onError: () => {
      toast({
        title: "Oops! Algo deu errado.",
        variant: "destructive",
      });
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

      if (onCompleted) {
        onCompleted(response as T);
      }
    },
  });
};
