import { Plus } from "lucide-react";
import { InputSearch } from "./input-search";
import { MenuLoggedUser } from ".";

export function LoggedHeader(): JSX.Element {
  return (
    <header className="text-white font-medium text-sm bg-[#161b22] p-3.5">
      <div className="flex justify-between items-center">
        <nav className="flex items-center gap-5">
          <div className="flex items-center gap-2 hover:cursor-pointer hover:text-zinc-400">
            <div className="flex items-center gap-5">
              <h3 className="hidden md:flex">TabNews</h3>
              <a className="underline underline-offset-4" href="/">
                Relevantes
              </a>
            </div>
          </div>

          <a href="/">Recentes</a>
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <InputSearch />

          <div className="hidden md:flex" title="Publicar novo conteúdo">
            <Plus className="w-5 h-5 hover:cursor-pointer" />
          </div>

          <div className="flex items-center gap-1 text-xs font-medium">
            <div
              className="bg-blue-700 w-2 h-2 rounded-[2px]"
              title="TabCoins"
            />
            0
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
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
