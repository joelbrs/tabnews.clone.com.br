"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ProfileTab } from "./_profile-tab";
import { useEffect, useState } from "react";
import { User, useAuth } from "../../hooks";
import { Footer } from "../../components";
import { Button } from "@repo/ui/components";
import { User as UserIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PerfilPage(): JSX.Element {
  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    async function getAuth() {
      setUser((await useAuth())?.user);
    }

    getAuth();
  }, [user]);

  return (
    <div className="flex flex-col items-center gap-10 pt-8 pb-3.5">
      <div className="sm:w-[60vw] w-full px-2 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">joelf</h1>

          {/** Settings Component */}
        </div>

        <Tabs className="w-full">
          <TabList>
            <Tab>Perfil</Tab>
            <Tab>Publicações</Tab>
          </TabList>

          <TabPanel>
            <ProfileTab user={user} />
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 items-center justify-center mt-10">
              <UserIcon className="w-10 h-10" />
              <h3 className="text-xl font-medium">
                Nenhuma publicação encontrada
              </h3>
              <span>Você ainda não fez nenhuma publicação.</span>

              <Button
                className="h-8 mt-2"
                variant="outline"
                onClick={() => {
                  router.push("/publicar");
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Publicar Conteúdo
              </Button>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <Footer className="w-[60vw]" />
    </div>
  );
}
