"use client";

import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  props: any;
  onChange: Function;
}

export default function MarkdownEditor({
  props,
  onChange,
}: Props): JSX.Element {
  const ref = useRef<any>();

  const [key, setKey] = useState(0);
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    if (!markdown) {
      setMarkdown(props.value);
      setKey(key + 1);
    }
  }, [props, markdown]);

  return (
    <Editor
      {...props}
      key={key}
      ref={ref}
      language="pt-BR"
      initialValue={markdown}
      previewStyle="vertical"
      previewHighlight={true}
      usageStatistics={false}
      hideModeSwitch={true}
      onChange={() => {
        const { current } = ref as any;
        if (!current) return;

        onChange(current.getInstance().getMarkdown());
      }}
      value={markdown}
    />
  );
}
