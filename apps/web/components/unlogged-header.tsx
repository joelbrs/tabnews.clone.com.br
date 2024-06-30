import { InputSearch } from "./input-search";

export function UnloggedHeader(): JSX.Element {
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

        <div className="flex items-center gap-5">
          <InputSearch />

          <div className="md:hidden">
            <a href="/">Entrar</a>
          </div>

          <div className="hidden md:flex">
            <a href="/">Login</a>
          </div>
          <div className="hidden md:flex">
            <a href="/">Cadastrar</a>
          </div>
        </div>
      </div>
    </header>
  );
}
