"use client";

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Label,
  useToast,
  Form,
} from "@repo/ui/components";
import { useAuth, User } from "../../hooks";
import { MarkdownEditor, ViewerMarkdown } from "../../components";
import { useState } from "react";
import { useMutation } from "react-relay";
import { UpdateUserMutation } from "../../graphql";
import { Loader2 } from "lucide-react";
import { z } from "../../utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchMutation } from "../../relay";

interface Props {
  user?: User;
}

const schema = z.object({
  description: z.string().optional(),
});

function RenderDescription(user?: User): JSX.Element {
  if (!user?.description) return <></>;

  const [description, setDescription] = useState<string>(user?.description);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const auth = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: user?.description,
    },
  });

  const [request] = useMutation(UpdateUserMutation);

  const updateUser = () => {
    const variables = {
      description: form.getValues("description") || "",
    };

    setIsLoading(true);
    fetchMutation<void>({
      variables,
      toast,
      request,
      onCompleted: () => {
        setDescription(variables.description);
        setShowEditor(false);
      },
    });
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label className="my-1">Descrição</Label>
        {auth.isLoggedUser(user.id) && !showEditor && (
          <Button
            onClick={() => {
              setShowEditor(true);
            }}
            className="text-blue-500 h-8 my-1"
            variant="ghost"
          >
            Editar Descrição
          </Button>
        )}
      </div>

      {(!showEditor && (
        <div className="border rounded-md px-5 py-2">
          <ViewerMarkdown value={description} />
        </div>
      )) || (
        <div className="mt-2">
          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(updateUser)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MarkdownEditor
                        {...field}
                        value={`${description}`}
                        onChange={($event: string) => {
                          setDescription($event);
                          form.setValue("description", $event);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-2 sm:mt-5 pt-10 sm:pt-0 w-full">
                <Button
                  className="text-muted-foreground h-8 px-8"
                  variant="ghost"
                  type="reset"
                  onClick={() => {
                    setShowEditor(false);
                    setDescription(user?.description as string);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-green-700 hover:bg-green-800 text-white h-8 px-8"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

export function ProfileTab({ user }: Props): JSX.Element {
  return (
    <main className="space-y-3 ">
      <section className="flex items-start flex-wrap sm:justify-start text-xs sm:text-sm gap-5">
        <div className="flex items-center gap-1 sm:text-sm sm:font-medium text-lg">
          <div className="bg-blue-700 w-2 h-2 rounded-[2px]" title="TabCoins" />
          <span>{user?.tabcoins || 0}</span>
          <span>TabCoins</span>
        </div>
        <div className="flex items-center gap-1 sm:text-sm sm:font-medium text-lg">
          <div className="bg-green-700 w-2 h-2 rounded-[2px]" title="TabCash" />
          <span>0</span>
          <span>TabCash</span>
        </div>
      </section>

      <section>{RenderDescription(user)}</section>
    </main>
  );
}
