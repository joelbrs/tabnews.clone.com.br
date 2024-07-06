import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import gfmLocale from "@bytemd/plugin-gfm/locales/pt_BR.json";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mathLocale from "@bytemd/plugin-math/locales/pt_BR.json";
import breaks from "@bytemd/plugin-breaks";

import locale from "bytemd/locales/pt.json";

import { Editor, Viewer } from "@bytemd/react";
import { Separator, Skeleton } from "@repo/ui/components";

interface Props {
  value: string;
  onChange?: Function;
  loading?: boolean
}

const plugins = [
  frontmatter(),
  gemoji(),
  gfm({
    locale: gfmLocale,
  }),
  math({
    locale: mathLocale,
  }),
  highlight(),
  breaks(),
];

export function ViewerMarkdown({ value, loading }: Props): JSX.Element {
  const skeleton = () => (
    <>
      <div className="space-y-2 mt-2">
        <div className="space-y-1">
          <Skeleton className="h-5 w-[88vw] sm:w-[1040px]" />
          <Skeleton className="h-5 w-[30vw] sm:w-[280px]" />
        </div>
        <Separator />
      </div>
      <div className="space-y-2 mt-4">
        {
          Array.from({ length: 7 }, (_, index) => (
            <div className="space-y-2" key={index}>
              <Skeleton className="h-4 w-[40vw]" />
              <Skeleton className="h-4 w-[55vw] sm:w-[880px]" />
              <Skeleton className="h-4 w-[88vw] sm:w-[1040px]" />
            </div>
          ))
        }
      </div>
    </>
  )

  return loading && skeleton() || <Viewer value={value} plugins={plugins} />;
}

export function MarkdownEditor({ value, onChange }: Props): JSX.Element {
  return (
    <Editor
      value={value}
      mode="split"
      locale={locale}
      onChange={($event: string) => {
        if (onChange) {
          onChange($event);
        }
      }}
      plugins={plugins}
    />
  );
}
