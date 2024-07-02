import { Label } from "@repo/ui/components";
import { User } from "../../hooks";

interface Props {
  user?: User;
}

function RenderDescription(description?: string): JSX.Element {
  if (!description) return <></>;

  return (
    <>
      <Label>Descrição</Label>
      <div className="border h-20 rounded-md p-2">{description}</div>
    </>
  );
}

export function ProfileTab({ user }: Props): JSX.Element {
  return (
    <main className="space-y-3 ">
      <section className="flex items-start flex-wrap sm:justify-start text-xs sm:text-sm gap-5">
        <div className="flex items-center gap-1 sm:text-md text-lg">
          <div className="bg-blue-700 w-2 h-2 rounded-[2px]" title="TabCoins" />
          <span>{user?.tabcoins}</span>
          <span>TabCoins</span>
        </div>
        <div className="flex items-center gap-1 sm:text-md text-lg">
          <div className="bg-green-700 w-2 h-2 rounded-[2px]" title="TabCash" />
          <span>0</span>
          <span>TabCash</span>
        </div>
      </section>

      <section>{RenderDescription(user?.description)}</section>
    </main>
  );
}
