import { useSetAtom } from "jotai";
import { useMemo, useRef } from "react";
import { setSchemaAtom } from "../../../store/schema";

export interface TextRenderProps {
  style: React.CSSProperties;
  text: string;
  id: string;
}

/** 
 * 在画布上呈现文本的渲染器
 */
export const TextRender = ({ style, text, id }: TextRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setSchema = useSetAtom(setSchemaAtom);

  return useMemo(() => {
    return <span
      aria-label="schema"
      style={style}
      id={id}
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  }, [style, setSchema]);
};
