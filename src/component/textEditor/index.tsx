import { useEffect, useRef } from "react";

export interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
}

export const TextEditor = ({ text, onChange }: TextEditorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    text && (containerRef.current!.innerHTML = text);
  }, [])

  return <div
    ref={containerRef}
    className="leading-[1] p-1 outline-none min-w-[30px] inline-block"
    contentEditable
    onInput={e => {
      onChange((e.target as HTMLDivElement).innerHTML);
    }}
  />;
};
