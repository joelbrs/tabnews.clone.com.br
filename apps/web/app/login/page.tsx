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
  useToast,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { InputPassword, Footer } from "../../components";
import { useMutation } from "react-relay";
import { LoginUserMutation } from "../../graphql";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { z } from "../../utils";
import { useState } from "react";
import { loginUserMutation$data } from "../../graphql/mutations/user/__generated__/loginUserMutation.graphql";
import Link from "next/link";
import { fetchMutation } from "../../relay";

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

  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [request] = useMutation(LoginUserMutation);

  const onSubmit = (variables: SchemaType) => {
    setLoading(true);
    fetchMutation<loginUserMutation$data>({
      variables,
      toast,
      request,
      onCompleted: ({ LoginUser }) => {
        const { token, userId } = LoginUser;

        localStorage.setItem("tabnews.auth.token", token);
        localStorage.setItem("tabnews.user.id", userId.toString());
        router.push("/");
      },
    });
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-8 gap-10">
      <section className="sm:w-[32vw] w-full px-2">
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
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </section>

      <section className="text-center text-sm">
        <p>
          Novo no TabNews?{" "}
          <Link href="/cadastro" className="text-blue-500 hover:underline">
            Crie sua conta aqui.
          </Link>
        </p>
        <p>
          Esqueceu sua senha?{" "}
          <Link href="/cadastro" className="text-blue-500 hover:underline">
            Clique aqui.
          </Link>
        </p>
      </section>
      <Footer className="w-[32vw]" />
    </main>
  );
}
