import { Separator } from "@repo/ui/components";
import LogoDark from "../public/tabnews-dark-logo.svg";
import Logo from "../public/tabnews-logo.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Footer({ className }: { className: string }): JSX.Element {
  const { theme } = useTheme();

  return (
    <div className={"flex flex-col justify-center items-center sm:gap-8 gap-6 w-full mb-8"}>
      <Separator className={`sm:${className} w-[95vw]`} />

      <footer
        className={`sm:space-y-5 space-y-3 text-center px-5 text-sm text-blue-500 sm:${className} w-[95vw]`}
      >
        <div className="flex flex-wrap justify-center items-center sm:gap-8 gap-4">
          <Link className="" href="/">
            Contato
          </Link>
          <Link href="/">FAQ</Link>
          <Link href="/">GitHub</Link>
          <Link href="/">Museu</Link>
          <Link href="/">RSS</Link>
          <Link href="/">Sobre</Link>
          <Link href="/">Status</Link>
          <Link href="/">Termos de Uso</Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Image
            alt="tabnews-log"
            src={(theme === "dark" && Logo) || LogoDark}
            width={28}
            height={28}
          />
          ©{new Date().getFullYear()} TabNews
        </div>
      </footer>
    </div>
  );
}
