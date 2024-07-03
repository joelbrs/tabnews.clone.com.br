"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { List, LogOut, Menu, Plus, Settings, User } from "lucide-react";
import { ToggleTheme } from ".";
import { useRouter } from "next/navigation";
import { User as IUser } from "../hooks";

interface Props {
  user: IUser;
}

export function MenuLoggedUser({ user }: Props): JSX.Element {
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("tabnews.auth.token");
    localStorage.removeItem("tabnews.user.id");

    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu className="w-7 h-7 hover:cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 rounded-xl md:relative md:right-3">
        <DropdownMenuItem
          onClick={() => router.push(`/${user.username}`)}
          className="hover:cursor-pointer"
        >
          <div className="flex items-center justify-start gap-1 px-2">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{user.username}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => {
              router.push("/publicar");
            }}
          >
            <div className="flex items-center justify-start gap-1 px-2">
              <Plus className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm">Novo conteúdo</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${user?.username}?conteudo=true`);
            }}
            className="hover:cursor-pointer"
          >
            <div className="flex items-center justify-start gap-1 px-2">
              <List className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm">Meus conteúdos</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => router.push("/perfil")}
          >
            <div className="flex items-center justify-start gap-1 px-2">
              <Settings className="mr-1 h-4 w-4 text-gray-500" />
              <span className="text-sm">Editar perfil</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="data-[highlighted]:bg-transparent justify-center">
            <ToggleTheme type="tabs" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem
            onClick={() => {
              logOut();
            }}
            className="text-red-600 data-[highlighted]:bg-red-50 dark:data-[highlighted]:bg-red-950 data-[highlighted]:text-red-600 hover:cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Deslogar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
