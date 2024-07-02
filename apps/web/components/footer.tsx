import { Separator } from "@repo/ui/components";
import Logo from "../public/tabnews-dark-logo.svg";
import Image from "next/image";

export function Footer({ className }: { className: string }): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center sm:gap-8 gap-6 w-full mb-8">
      <Separator className={`sm:${className} w-[95vw]`} />

      <footer
        className={`sm:space-y-5 space-y-3 text-center px-5 text-sm text-blue-500 sm:${className} w-[95vw]`}
      >
        <div className="flex flex-wrap justify-center items-center sm:gap-8 gap-4">
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
          <Image alt="tabnews-log" src={Logo} width={28} height={28} />©
          {new Date().getFullYear()} TabNews
        </div>
      </footer>
    </div>
  );
}
