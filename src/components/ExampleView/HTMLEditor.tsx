import MonacoEditor, { loader } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import * as React from "react";

// import useDarkMode from "@/src/components/hooks/Theme";

loader.init().then((monaco) => {
  monaco.editor.defineTheme("lightTheme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#ffffff",
    },
  });
  monaco.editor.defineTheme("darkTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#202B36",
    },
  });
});

export default function HTMLEditor(props: {
  code: string;
  setCode: (code: string) => void;
  onChange?: (code: string) => void;
  className?: string;
}) {
  const { code, setCode } = props;
  const { theme } = useTheme();

  return (
    <MonacoEditor
      className={props.className}
      theme={theme + "Theme"}
      defaultLanguage="html"
      options={{ wordWrap: "on" }}
      value={code}
      onChange={(e) => {
        setCode(e || "");
      }}
    />
  );
}
