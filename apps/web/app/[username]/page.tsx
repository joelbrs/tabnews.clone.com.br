"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { fetchQuery } from "relay-runtime";
import { Footer, MenuActions } from "../../components";
import { GetUserPostsQuery } from "../../graphql";
import { getUserPostsQuery$data } from "../../graphql/queries/user/__generated__/getUserPostsQuery.graphql";
import { User } from "../../hooks";
import { environment } from "../../relay";
import { ProfileTab } from "./_profile-tab";
import { PublishesTab } from "./_publishes-tab";
import { Settings, User as UserIcon } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function RenderEditProfile(
  router: AppRouterInstance,
  isSameUser: boolean
): JSX.Element {
  return (
    <>
      {isSameUser && (
        <MenuActions
          onClick={() => {
            router.push("/perfil");
          }}
        >
          <div className="flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-muted-foreground" />
            Editar Perfil
          </div>
        </MenuActions>
      )}
    </>
  );
}

export default function PerfilPage(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [tab, setTab] = useState(0);
  const [key, setKey] = useState(0);

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    async function getPosts() {
      const data = await fetchQuery(environment, GetUserPostsQuery, {
        username: pathname?.replace("/", ""),
      }).toPromise();

      const { edges } = (data as getUserPostsQuery$data).GetUser;
      const user = Array.isArray(edges) && edges[0].node;

      setUser(user);
    }

    if (params.get("conteudo")) {
      setTab(1);
      setKey(key + 1);
    }

    getPosts();
  }, [pathname]);

  const isSameUser = () => {
    const loggedUserId = localStorage.getItem("tabnews.user.id");
    return loggedUserId === user?.id;
  };

  return (
    <main className="flex flex-col items-center gap-10 pt-8 pb-3.5">
      <div className="sm:w-[60vw] w-full px-2 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>

          {RenderEditProfile(router, isSameUser())}
        </div>

        <Tabs
          className="w-full"
          defaultIndex={tab}
          key={key}
          onSelect={(tab) => setTab(tab)}
        >
          <TabList>
            <Tab>Perfil</Tab>
            <Tab>
              Publicações{" "}
              {tab === 1 && user?.posts.length ? (
                <span className="text-xs px-2 dark:bg-slate-800 dark:text-white bg-slate-200 rounded-full font-bold">
                  {user?.posts?.length}
                </span>
              ) : (
                <></>
              )}
            </Tab>
            <Tab>Comentários</Tab>
          </TabList>

          <TabPanel>
            <ProfileTab user={user} />
          </TabPanel>
          <TabPanel>
            <PublishesTab user={user} />
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-2 items-center justify-center mt-10">
              <UserIcon className="w-10 h-10" />
              <h3 className="text-xl font-medium">
                Nenhum comentário encontrado
              </h3>
              {(isSameUser() && (
                <span className="text-center">
                  Você ainda não fez nenhum comentário.
                </span>
              )) || (
                <span className="text-center">
                  {user?.username} ainda não fez nenhum comentário.
                </span>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <Footer className="w-[60vw]" />
    </main>
  );
}
