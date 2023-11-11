import { useSetAtom } from 'jotai';
import { useMemo, useRef } from 'react';
import { setSchemaAtom } from '../../../store/schema';

export interface BlockRenderProps {
  style: React.CSSProperties;
  text: string;
  id: string;
}

export const BlockRender = ({ style, text, id }: BlockRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setSchema = useSetAtom(setSchemaAtom);

  return useMemo(() => {
    return (
      <span aria-label='schema' style={style} id={id} ref={containerRef} dangerouslySetInnerHTML={{ __html: text }} />
    );
  }, [style, setSchema]);
};
