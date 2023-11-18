import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { drawingSchemaIdAtom, schemasAtom } from '../store/schema';
import { allowSelectAtom } from '../store/toolbar';
import { SchemaMask } from './schemaMask';
import { SchemaRender } from './schemaRender';

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const allowSelect = useAtomValue(allowSelectAtom);
  const container = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSelect) return;
    const element = event.target as HTMLDivElement;
    if (!element.id) return;
    setDrawingScheamId(element.id);
  };

  const scaleRef = useRef<{ origin: { x: number; y: number }; scale: number }>({
    origin: { x: 0, y: 0 },
    scale: window.innerWidth / 1920,
  });

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // no direction
    if (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0) return;
    if (e.ctrlKey) {
      // inner
      if (e.deltaY > 0) {
        scaleRef.current.scale = scaleRef.current.scale > 0.05 ? scaleRef.current.scale - 0.01 : 0.05;
      }
      // out
      if (e.deltaY < 0) {
        scaleRef.current.scale = scaleRef.current.scale < 2 ? scaleRef.current.scale + 0.01 : 2;
      }
      scaleRef.current.origin = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  };

  const render = () => {
    if (container.current) {
      const { scale, origin } = scaleRef.current;
      const offsetX = origin.x - container.current.offsetLeft;
      const offsetY = origin.y - container.current.offsetTop;
      container.current.style.transform = `scale(${scale})`;
      container.current.style.transformOrigin = `${offsetX / scaleRef.current.scale}px ${
        offsetY / scaleRef.current.scale
      }px`;
    }
    requestAnimationFrame(render);
  };

  render();

  useEffect(() => {
    const stopScale = (evnet: WheelEvent) => {
      if (evnet.ctrlKey) {
        evnet.preventDefault();
      }
    };
    window.addEventListener('wheel', stopScale, { passive: false });
    return () => window.removeEventListener('wheel', stopScale);
  }, []);

  return (
    <div className='overflow-auto relative w-screen h-screen bg-[#180828]' onClick={handleClick} onWheel={handleWheel}>
      <div className='w-[1920px] h-[1080px] bg-white  origin-center' ref={container}>
        {schemas.map((item) => (
          <SchemaRender key={item.id} {...item} />
        ))}
        <SchemaMask />
      </div>
    </div>
  );
};
