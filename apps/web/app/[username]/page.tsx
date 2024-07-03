"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { fetchQuery } from "relay-runtime";
import { Footer } from "../../components";
import { GetUserPostsQuery } from "../../graphql";
import { getUserPostsQuery$data } from "../../graphql/queries/user/__generated__/getUserPostsQuery.graphql";
import { User } from "../../hooks";
import { environment } from "../../relay";
import { ProfileTab } from "./_profile-tab";
import { PublishesTab } from "./_publishes-tab";

export default function PerfilPage(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [tab, setTab] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    async function getPosts() {
      const data = await fetchQuery(environment, GetUserPostsQuery, {
        username: pathname?.replace("/", ""),
      }).toPromise();

      const { edges } = (data as getUserPostsQuery$data).GetUser;
      setUser(Array.isArray(edges) ? edges[0].node : undefined);
    }

    getPosts();
  }, [pathname]);

  return (
    <main className="flex flex-col items-center gap-10 pt-8 pb-3.5">
      <div className="sm:w-[50vw] w-full px-2 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>

          {/** Settings Component */}
        </div>

        <Tabs className="w-full" onSelect={(tab) => setTab(tab)}>
          <TabList>
            <Tab>Perfil</Tab>
            <Tab>
              Publicações{" "}
              {tab === 1 && user?.posts?.length && (
                <span className="text-xs px-2 dark:bg-slate-800 dark:text-white bg-slate-200 rounded-full font-bold">
                  {user?.posts?.length}
                </span>
              )}
            </Tab>
          </TabList>

          <TabPanel>
            <ProfileTab user={user} />
          </TabPanel>
          <TabPanel>
            <PublishesTab posts={user?.posts} />
          </TabPanel>
        </Tabs>
      </div>

      <Footer className="w-[50vw]" />
    </main>
  );
}
