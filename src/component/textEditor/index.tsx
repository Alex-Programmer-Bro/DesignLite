import { useEffect, useRef } from "react";

export interface TextEditorProps {
  style: React.CSSProperties;
  text: string;
  onChange: (text: string) => void;
}

export const TextEditor = ({ style, text, onChange }: TextEditorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    text && (containerRef.current!.innerHTML = text);
  }, [])

  return <div
    style={style}
    ref={containerRef}
    contentEditable
    onInput={e => {
      onChange((e.target as HTMLDivElement).innerHTML);
    }}
  />;
};
