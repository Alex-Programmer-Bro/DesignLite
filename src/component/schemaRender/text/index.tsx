import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { drawingSchemaIdAtom, setSchemaAtom } from "../../../store/schema";

export interface TextRenderProps {
  id: string;
  style: React.CSSProperties;
  text: string;
  onChange: (text: string) => void;
}

/** 
 * 在画布上呈现文本的渲染器
 */
export const TextRender = ({ id, style, text, onChange }: TextRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawingSchemaId = useAtomValue(drawingSchemaIdAtom);
  const setSchema = useSetAtom(setSchemaAtom);

  useEffect(() => {
    text && (containerRef.current!.innerHTML = text);
  }, [text]);

  useEffect(() => {
    if (drawingSchemaId === id) {
      containerRef.current!.focus();
    }
  }, [drawingSchemaId, id]);

  useEffect(() => {
    if (containerRef.current) {
      setSchema({
        id,
        schema: {
          dom: containerRef.current as HTMLElement
        }
      })
    }
  }, [containerRef.current]);

  return <div
    style={style}
    ref={containerRef}
    contentEditable
    onInput={e => {
      onChange((e.target as HTMLDivElement).innerHTML);
    }}
  />;
};
