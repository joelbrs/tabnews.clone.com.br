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
import { useCookies } from "next-client-cookies";
import { useForm } from "react-hook-form";
import { InputPassword, Footer } from "../../components";
import { useMutation } from "react-relay";
import { LoginUserMutation } from "../../graphql";
import { loginUserMutation$data } from "../../graphql/mutations/__generated__/loginUserMutation.graphql";
import { useRouter } from "next/navigation";
import { z } from "zod";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default function LoginPage(): JSX.Element {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const router = useRouter();
  const cookies = useCookies();

  const [request] = useMutation(LoginUserMutation);

  const onSubmit = (variables: SchemaType) => {
    request({
      variables,
      onError: (error) => {
        console.log(error);
      },
      onCompleted: (response) => {
        const { token } = (response as loginUserMutation$data).LoginUser;

        cookies.set("tabnews.auth.token", token);
        router.push("/");
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center pt-8 gap-10">
      <section className="md:w-[32vw] w-full px-2">
        <h1 className="text-3xl font-bold mb-5">Login</h1>

        <Form {...form}>
          <form
            className="w-full space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
      <Footer className="w-[32vw]" />
    </main>
  );
}
