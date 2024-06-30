"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import { InputPassword } from "../../components";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  username: z.string().min(4),
  password: z.string().min(8).max(20),
});

export default function LoginPage(): JSX.Element {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: SchemaType) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-8 gap-10">
      <section className="w-[32vw]">
        <h1 className="text-3xl font-bold mb-5">Login</h1>

        <Form {...form}>
          <form
            className="w-full space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <Button
              className="w-full mt-3 bg-green-700 hover:bg-green-800 text-white"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </section>

      <section className="text-center text-sm">
        <p>
          Novo no TabNews?{}{" "}
          <span className="text-blue-500">Crie sua conta aqui.</span>
        </p>
        <p>
          Esqueceu sua senha?{}{" "}
          <span className="text-blue-500">Clique aqui.</span>
        </p>
      </section>
    </main>
  );
}
