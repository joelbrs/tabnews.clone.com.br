"use client";

import { usePathname } from "next/navigation";
import { InputSearch } from "./input-search";
import { ToggleTheme } from "./theme-toggle";
import Logo from "../public/tabnews-logo.svg";
import Image from "next/image";

export function UnloggedHeader(): JSX.Element {
  const pathname = usePathname();

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
              <h3 className="hidden sm:flex">TabNews</h3>
              <a className={pathnameIsSelected("/")} href="/">
                Relevantes
              </a>
            </div>
          </div>
          <a className={pathnameIsSelected("/recentes")} href="/recentes">
            Recentes
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <InputSearch />

          <ToggleTheme type="icon" />

          <div className="sm:hidden">
            <a className={pathnameIsSelected("/login")} href="/login">
              Entrar
            </a>
          </div>

          <div className="hidden sm:flex">
            <a className={pathnameIsSelected("/login")} href="/login">
              Login
            </a>
          </div>
          <div className="hidden sm:flex">
            <a className={pathnameIsSelected("/cadastro")} href="/cadastro">
              Cadastrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
