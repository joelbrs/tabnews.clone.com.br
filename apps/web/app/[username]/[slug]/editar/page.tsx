"use client";

import { z } from "../../../../utils";
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
import { MarkdownEditor, Footer } from "../../../../components";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "react-relay";
import { UpdatePostMutation } from "../../../../graphql";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchMutation } from "../../../../relay";
import { getPost } from "../get-post";
import { useAuth } from "../../../../hooks";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  title: z.string().min(4),
  description: z.string().min(5),
  font: z.string().optional(),
});

export default function EditarPostPage(): JSX.Element {
  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();

  const pathname = usePathname();
  const [request] = useMutation(UpdatePostMutation);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      font: "",
      title: "",
    },
  });

  useEffect(() => {
    async function detail() {
      const [_, __, slug] = pathname.split("/");

      const post = await getPost(slug);

      if (post) {
        if (!auth.isLoggedUser(post.user?.id)) {
          router.push(`${pathname?.replace("/editar", "")}`);
          toast({
            title: "Atenção",
            description: "Unauthorized.",
            variant: "warning",
          });
          return;
        }

        form.setValue("description", post?.description);
        form.setValue("title", post?.title);
        form.setValue("font", post?.font);
      }
    }

    detail();
  }, [pathname]);

  const onSubmit = (variables: SchemaType) => {
    const [_, __, slug] = pathname.split("/");

    setLoading(true);
    fetchMutation({
      variables: {
        ...variables,
        slug,
      },
      request,
      toast,
      onCompleted: () => {
        router.push(`${pathname?.replace("/editar", "")}`);
      },
    });
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[62vw] w-full px-2">
        <h1 className="text-3xl font-bold mb-5">Editar conteúdo</h1>

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
                      {...field}
                      value={`${field.value}`}
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
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </section>

      <Footer className="w-[62vw]" />
    </main>
  );
}
