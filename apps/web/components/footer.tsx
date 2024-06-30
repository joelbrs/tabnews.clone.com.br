import { Separator } from "@repo/ui/components";

export function Footer({ className }: { className: string }): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full mb-8">
      <Separator className={className} />

      <footer
        className={`space-y-5 text-center px-5 text-sm text-blue-500 ${className}`}
      >
        <div className="flex flex-wrap justify-center items-center gap-8">
          <a className="" href="/">
            Contato
          </a>
          <a href="/">FAQ</a>
          <a href="/">GitHub</a>
          <a href="/">Museu</a>
          <a href="/">RSS</a>
          <a href="/">Sobre</a>
          <a href="/">Status</a>
          <a href="/">Termos de Uso</a>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500">
          ©{new Date().getFullYear()} TabNews
        </div>
      </footer>
    </div>
  );
}
