import { Input, Textarea } from '@nextui-org/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { updateStateAtom } from '../../store';
import { metaStateAtom } from '../../store/meta';
import { getDrawingSchema, setDrawingSchemaAtom } from '../../store/schema';
import { SchemaType } from '../../types/schema';

interface SchemaEditor {
  /** 监听元素的 id */
  id?: string;
}

/** schema 选中时的遮罩样式组件 */
export const SchemaEditor = ({ id }: SchemaEditor) => {
  const [style, setStyle] = useState<React.CSSProperties>({ backgroundColor: 'transparent' });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [valid, setValid] = useState(true);
  const drawingShema = useAtomValue(getDrawingSchema)!;
  const state = useAtomValue(metaStateAtom);
  const updateDrawingSchema = useSetAtom(setDrawingSchemaAtom);
  const updateMeta = updateStateAtom(metaStateAtom, (meta) => {
    updateDrawingSchema({ meta });
  });

  useEffect(() => {
    if (id) {
      const dom = document.getElementById(id) as HTMLElement;
      if (!dom) return setValid(false);

      const updateMaskStyle = () => {
        const { width, height } = dom.style;
        setStyle({
          width: width === 'auto' ? dom.offsetWidth : width,
          height: height === 'auto' ? dom.offsetHeight : height,
          left: `${dom.offsetLeft}px`,
          top: `${dom.offsetTop}px`,
        });
      };

      const config = { attributes: true, childList: false, subtree: false, attributeFilter: ['style'] };
      const observer = new MutationObserver(updateMaskStyle);
      observer.observe(dom, config);

      updateMaskStyle();

      return () => {
        observer.disconnect();
      };
    }
  }, [id]);

  if (id && valid) {
    return (
      <div
        ref={containerRef}
        aria-label='schema-mask'
        style={{
          ...style,
          position: 'absolute',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {drawingShema?.type === SchemaType.Image ? (
          <Input type='url' value={state.imageURL} onChange={(e) => updateMeta.imageURL(e.target.value)} />
        ) : (
          <Textarea
            labelPlacement='outside'
            value={state.content}
            style={{ backgroundColor: 'transparent', outline: 'none', border: 'none' }}
            onChange={(e) => updateMeta.content(e.target.value)}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};
