"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components";

interface ToggleThemeProps {
  type: "icon" | "tabs";
}

function RenderThemeAsIcon(
  setTheme: React.Dispatch<React.SetStateAction<string>>,
  theme?: string
): JSX.Element {
  if (theme === "light") {
    return (
      <Moon
        className="w-4 h-4"
        onClick={() => {
          setTheme("dark");
        }}
      />
    );
  }
  return (
    <Sun
      className="w-4 h-4 text-[#ecdc0f99] hover:text-[#ffef08dc]"
      onClick={() => {
        setTheme("light");
      }}
    />
  );
}

function RenderThemeAsTabs(
  setTheme: React.Dispatch<React.SetStateAction<string>>,
  theme = "system"
): JSX.Element {
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="h-8">
        <TabsTrigger value="dark">
          {RenderThemeAsIcon(setTheme, "light")}
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setTheme("system");
          }}
          value="system"
        >
          Auto
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setTheme("light");
          }}
          value="light"
        >
          <Sun
            className="w-4 h-4"
            onClick={() => {
              setTheme("light");
            }}
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function ToggleTheme(
  { type }: ToggleThemeProps = { type: "icon" }
): JSX.Element {
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    document.body.setAttribute("data-theme", `${theme}`);
  }, [theme]);

  return (
    <div className="hover:cursor-pointer">
      {type === "icon" ? (
        RenderThemeAsIcon(setTheme, theme)
      ) : (
        <div className="w-full flex-items-center justify-center">
          {RenderThemeAsTabs(setTheme, theme)}
        </div>
      )}
    </div>
  );
}
