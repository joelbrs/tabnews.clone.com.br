"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Footer } from "../../components";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  username: z
    .string()
    .min(4, "'username' deverá ter, no mínimo, 4 caracteres."),
  email: z.string().email(),
  description: z.string().optional(),
  notify: z.boolean().optional(),
});

export default function PerfilPage(): JSX.Element {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      email: "",
      notify: false,
      username: "",
    },
  });

  const onSubmit = () => {};

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[50vw] w-full px-2">
        <h1 className="text-3xl font-bold mb-5">Editar Perfil</h1>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Nome de Usuário *</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs text-muted-foreground">
                    Esse nome será exibido publicamente.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>E-mail *</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notify"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2 mt-5 mb-2">
                      <Checkbox
                        id="notification"
                        onCheckedChange={($event: boolean) => {
                          form.setValue("notify", $event);
                        }}
                      />
                      <Label className="hover:cursor-pointer" htmlFor="terms">
                        Receber notificações por email
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 py-2">
              <Label>Senha</Label>
              <span className="text-xs hover:underline hover:cursor-pointer text-blue-500">
                Utilize o fluxo de recuperação de senha →
              </span>
            </div>

            <span className="text-sm pt-2">
              Os campos marcados com um asterisco (*) são obrigatórios.
            </span>

            <Button
              className="w-full mt-3 bg-green-700 hover:bg-green-800 text-white"
              type="submit"
            >
              Salvar
            </Button>
          </form>
        </Form>
      </section>

      <Footer className="w-[50vw]" />
    </main>
  );
}
