"use client";

import { usePathname } from "next/navigation";
import { InputSearch } from "./input-search";

export function UnloggedHeader(): JSX.Element {
  const pathname = usePathname();

  const pathnameIsSelected = (path: string) => {
    return (pathname === path && "underline underline-offset-4") || "";
  };

  return (
    <header className="text-white font-medium text-sm bg-[#161b22] p-3.5">
      <div className="flex justify-between items-center">
        <nav className="flex items-center gap-5">
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-zinc-400">
            <div className="flex items-center gap-5">
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

        <div className="flex items-center gap-5">
          <InputSearch />

          <div className="md:hidden">
            <a className={pathnameIsSelected("/login")} href="/login">
              Entrar
            </a>
          </div>

          <div className="hidden md:flex">
            <a className={pathnameIsSelected("/login")} href="/login">
              Login
            </a>
          </div>
          <div className="hidden md:flex">
            <a className={pathnameIsSelected("/cadastro")} href="/cadastro">
              Cadastrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
