"use client";

import { z } from "../../utils";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  useToast,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MarkdownEditor from "../../components/markdown-editor";
import { Footer } from "../../components";
import { useRouter } from "next/navigation";
import { useMutation } from "react-relay";
import { CreatePostMutation } from "../../graphql";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { User, useAuth } from "../../hooks";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  title: z.string().min(4),
  description: z.string().min(5),
  font: z.string().optional(),
});

function renderWarnFirstPage(isFirst: boolean): JSX.Element {
  if (!isFirst) return <></>;

  return (
    <div className="border mb-5 border-yellow-400 dark:border-amber-600 bg-yellow-100 dark:text-white dark:bg-amber-600 px-3 py-3.5 rounded-lg">
      ⚠ Atenção: Pedimos encarecidamente que{" "}
      <span className="text-blue-500 hover:cursor-pointer hover:underline">
        leia isso antes
      </span>{" "}
      de fazer sua primeira publicação.
    </div>
  );
}

export default function PublicarPage(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const [request] = useMutation(CreatePostMutation);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      font: "",
      title: "",
    },
  });

  useEffect(() => {
    async function getAuth() {
      setUser((await useAuth())?.user);
    }

    getAuth();
  }, [user]);

  const onSubmit = (variables: SchemaType) => {
    setLoading(true);
    request({
      variables,
      onError: () => {
        toast({
          title: "Oops! Algo deu errado.",
          variant: "destructive",
        });
        setLoading(false);
      },
      onCompleted: (_, errors) => {
        setLoading(false);
        if (errors?.length) {
          toast({
            title: "Atenção",
            description: errors[0]?.message,
            variant: "warning",
          });
          return;
        }

        toast({
          title: "Sucesso!",
          description: "Salvo com sucesso.",
          variant: "success",
        });

        router.push("/");
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[62vw] w-full px-2">
        {renderWarnFirstPage(Boolean(user?.posts?.length))}
        <h1 className="text-3xl font-bold mb-5">Publicar novo conteúdo</h1>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Título *</Label>
                  <FormControl>
                    <Input
                      placeholder="e.g Como os jogos de Atari eram desenvolvidos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Corpo da publicação *</Label>
                  <FormControl>
                    <MarkdownEditor
                      props={field}
                      onChange={($event: string) => {
                        form.setValue("description", $event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="font"
              render={({ field }) => (
                <FormItem>
                  <Label>Fonte</Label>
                  <FormControl>
                    <Input
                      placeholder="https://origem.site/noticia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="text-sm pt-2">
              Os campos marcados com um asterisco (*) são obrigatórios.
            </span>

            <div className="w-full flex justify-end gap-3">
              <Button
                className="mt-3 h-8 px-8"
                variant="ghost"
                type="reset"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancelar
              </Button>
              <Button
                className="mt-3 bg-green-700 hover:bg-green-800 text-white h-8 px-8"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </section>

      <Footer className="w-[62vw]" />
    </main>
  );
}
