"use client";

import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MarkdownEditor from "../../components/markdown-editor";
import { Footer } from "../../components";
import { useRouter } from "next/navigation";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  title: z.string(),
  body: z.string(),
  font: z.string().optional(),
});

export default function PublicarPage(): JSX.Element {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      body: "",
      font: "",
      title: "",
    },
  });

  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[60vw] w-full px-2">
        <h1 className="text-3xl font-bold mb-5">Publicar novo conteúdo</h1>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(() => {})}>
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
              name="body"
              render={({ field }) => (
                <FormItem>
                  <Label>Corpo da publicação *</Label>
                  <FormControl>
                    <MarkdownEditor
                      props={field}
                      onChange={($event: string) => {
                        form.setValue("body", $event);
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
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </section>

      <Footer className="w-[60vw]" />
    </main>
  );
}
