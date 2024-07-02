"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { UnloggedHeader } from "../unlogged-header";
import { LoggedHeader } from "../logged-header";

export default function HeaderProvider(): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function GetAuth() {
      setIsLogged((await useAuth())?.isLogged);
    }

    GetAuth();
  }, [isLogged]);

  return <>{(isLogged && <LoggedHeader />) || <UnloggedHeader />}</>;
}
