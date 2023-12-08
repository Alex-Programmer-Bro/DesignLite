import { Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
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
  const [effect, setEffect] = useState<React.CSSProperties>({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textArea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (id) {
      const dom = document.getElementById(id) as HTMLElement;
      if (!dom) return setValid(false);

      const updateMaskStyle = () => {
        const { width, height, padding, backgroundColor, borderRadius, color } = dom.style;
        setStyle({
          width: width === 'auto' ? dom.offsetWidth : width,
          height: height === 'auto' ? dom.offsetHeight : height,
          left: `${dom.offsetLeft}px`,
          top: `${dom.offsetTop}px`,
        });
        setEffect({
          padding,
          backgroundColor,
          borderRadius,
          color,
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

  useEffect(() => {
    drawingShema?.type === SchemaType.Image && onOpen();
    return onClose;
  }, [drawingShema]);

  useEffect(() => {
    if (textArea.current) {
      textArea.current.focus();
      const length = textArea.current.value.length;
      textArea.current.setSelectionRange(length, length);
    }
  }, [textArea.current]);

  if (id && valid) {
    return (
      <>
        <div
          ref={containerRef}
          aria-label='schema-editor'
          style={{
            ...style,
            position: 'absolute',
            zIndex: 10,
            boxSizing: 'border-box',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {drawingShema?.type === SchemaType.Block && (
            <textarea
              value={state.content}
              ref={textArea}
              className='resize-none w-full h-full'
              style={{ ...effect, outline: 'none' }}
              onChange={(e) => updateMeta.content(e.target.value)}
            />
          )}
        </div>
        <Modal size='sm' isOpen={isOpen} onClose={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader className='flex flex-col gap-1'>Image URL</ModalHeader>
            <ModalBody>
              <Input type='url' value={state.imageURL} onChange={(e) => updateMeta.imageURL(e.target.value)} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};
