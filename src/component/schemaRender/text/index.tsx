import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { drawingSchemaIdAtom, setSchemaAtom } from "../../../store/schema";

export interface TextRenderProps {
  id: string;
  style: React.CSSProperties;
  text: string;
}

/** 
 * 在画布上呈现文本的渲染器
 */
export const TextRender = ({ id, style, text }: TextRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawingSchemaId = useAtomValue(drawingSchemaIdAtom);
  const setSchema = useSetAtom(setSchemaAtom);
  const valueRef = useRef(text);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    valueRef.current = text;
    if (!focus) {
      (containerRef.current as HTMLDivElement).innerHTML = text;
    }
  }, [text, focus]);

  useEffect(() => {
    if (drawingSchemaId === id) {
      containerRef.current!.focus();
    }
  }, [drawingSchemaId, id]);

  return useMemo(() => {
    return <span
      aria-label="schema"
      style={style}
      ref={containerRef}
      contentEditable
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      dangerouslySetInnerHTML={{ __html: valueRef.current }}
      onInput={e => {
        setSchema({
          id,
          schema: {
            content: (e.target as HTMLDivElement).innerHTML,
          }
        })
      }}
    />
  }, [style, setSchema]);
};
