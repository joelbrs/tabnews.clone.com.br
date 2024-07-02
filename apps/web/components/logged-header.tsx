"use client";

import { Plus } from "lucide-react";
import { InputSearch } from "./input-search";
import { MenuLoggedUser } from ".";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../public/tabnews-logo.svg";
import Image from "next/image";

interface Props {
  tabcoins?: number;
}

export function LoggedHeader({ tabcoins }: Props): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  const pathnameIsSelected = (path: string) => {
    return (pathname === path && "underline underline-offset-4") || "";
  };

  return (
    <header className="text-white font-medium text-sm bg-[#161b22] sm:p-3.5 py-5 px-3.5">
      <div className="flex justify-between items-center">
        <nav className="flex items-center gap-5">
          <div className="space-x-2 hover:cursor-pointer hover:text-zinc-400">
            <div className="flex items-center gap-5">
              <Image alt="tabnews-log" src={Logo} width={32} height={32} />
              <h3 className="hidden md:flex">TabNews</h3>
              <a className={pathnameIsSelected("/")} href="/">
                Relevantes
              </a>
            </div>
          </div>

          <a className={pathnameIsSelected("/recentes")} href="/recentes">
            Recentes
          </a>
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden md:flex">
            <InputSearch />
          </div>

          <div
            className="hidden md:flex"
            title="Publicar novo conteúdo"
            onClick={() => {
              router.push("/publicar");
            }}
          >
            <Plus className="w-5 h-5 hover:cursor-pointer" />
          </div>

          <div
            className="flex items-center gap-1 text-xs font-medium"
            title="TabCoins"
          >
            <div
              className="bg-blue-700 w-2 h-2 rounded-[2px]"
              title="TabCoins"
            />
            {tabcoins}
          </div>
          <div
            className="flex items-center gap-1 text-xs font-medium"
            title="TabCash"
          >
            <div
              className="bg-green-700 w-2 h-2 rounded-[2px]"
              title="TabCash"
            />
            0
          </div>

          <MenuLoggedUser />
        </div>
      </div>
    </header>
  );
}
