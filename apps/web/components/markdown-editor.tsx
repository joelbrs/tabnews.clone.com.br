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

interface Props {
  value: string;
  onChange?: Function;
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

export function ViewerMarkdown({ value }: Props): JSX.Element {
  return <Viewer value={value} plugins={plugins} />;
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
