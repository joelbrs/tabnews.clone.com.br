"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
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
import { z } from "../../utils";
import { Footer, MarkdownEditor } from "../../components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { useMutation } from "react-relay";
import { UpdateUserMutation } from "../../graphql";
import { Loader2 } from "lucide-react";

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

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    async function getAuth() {
      const { user } = await useAuth();

      if (!user) {
        return router.push("/");
      }

      form.setValue("username", user.username);
      form.setValue("email", user.email);
      form.setValue("description", user?.description);
      form.setValue("notify", user.notify);
    }

    getAuth();
  }, [form]);

  const [isLoading, setLoading] = useState(false);
  const [request] = useMutation(UpdateUserMutation);

  const onSubmit = (variables: SchemaType) => {
    setLoading(true);
    request({
      variables,
      onError: () => {
        toast({
          title: "Oops! Algo deu errado.",
          variant: "destructive",
        });
      },
      onCompleted: (_, errors) => {
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
      },
    });
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[48vw] w-full px-2">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Descrição</Label>
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
              name="notify"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2 lg:mt-5 mt-20 mb-2">
                      <Checkbox
                        {...field}
                        checked={field.value}
                        value={`${field.value}`}
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
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Salvar
            </Button>
          </form>
        </Form>
      </section>

      <Footer className="w-[48vw]" />
    </main>
  );
}
