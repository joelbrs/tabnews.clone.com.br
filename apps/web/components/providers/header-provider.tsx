"use client";

import { useEffect, useState } from "react";
import { User, useAuth } from "../../hooks";
import { UnloggedHeader } from "../unlogged-header";
import { LoggedHeader } from "../logged-header";

export default function HeaderProvider(): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function GetAuth() {
      const { isLogged, user } = await useAuth();

      setIsLogged(isLogged);
      setUser(user);
    }

    GetAuth();
  }, [isLogged]);

  return (
    <>
      {(isLogged && <LoggedHeader user={user as User} />) || <UnloggedHeader />}
    </>
  );
}
