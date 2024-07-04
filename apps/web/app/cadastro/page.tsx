"use client";

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
  useToast,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { z } from "../../utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputPassword, Footer } from "../../components";
import { useMutation } from "react-relay";
import { CreateUserMutation } from "../../graphql";
import { Loader2 } from "lucide-react";
import { fetchMutation } from "../../relay";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default function CadastroPage(): JSX.Element {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);
  const [request] = useMutation(CreateUserMutation);

  const onSubmit = (variables: SchemaType): void => {
    setLoading(true);
    fetchMutation({ request, variables, toast });
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 pt-8">
      <section className="sm:w-[32vw] w-full px-2">
        <h1 className="text-3xl font-bold mb-5">Cadastro</h1>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Nome de Usuário</Label>
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
                  <Label>E-mail</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputPassword label="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 mt-5 mb-2">
              <Checkbox
                id="terms"
                onCheckedChange={($event: boolean) => {
                  setAcceptTerms($event);
                }}
              />
              <Label className="hover:cursor-pointer" htmlFor="terms">
                Li e estou de acordo com os{}
                <span className="text-blue-500"> Termos de Uso</span>.
              </Label>
            </div>

            <Button
              className="w-full mt-3 bg-green-700 hover:bg-green-800 text-white"
              disabled={!acceptTerms || isLoading}
              type="submit"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Criar cadastro
            </Button>
          </form>
        </Form>
      </section>

      <Footer className="w-[32vw]" />
    </main>
  );
}
