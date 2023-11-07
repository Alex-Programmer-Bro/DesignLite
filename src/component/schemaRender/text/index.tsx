import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { drawingSchemaIdAtom } from "../../../store/schema";

export interface TextRenderProps {
  id: string;
  style: React.CSSProperties;
  text: string;
  onChange: (text: string) => void;
}

export const TextRender = ({ id, style, text, onChange }: TextRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawingSchemaId = useAtomValue(drawingSchemaIdAtom);

  useEffect(() => {
    text && (containerRef.current!.innerHTML = text);
  }, []);

  useEffect(() => {
    if (drawingSchemaId === id) {
      containerRef.current!.focus();
    }
  }, [drawingSchemaId, id]);

  return <div
    style={style}
    ref={containerRef}
    contentEditable
    onInput={e => {
      onChange((e.target as HTMLDivElement).innerHTML);
    }}
  />;
};
