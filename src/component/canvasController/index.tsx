import React, { useEffect, useState } from 'react';

interface CanvasControllerProps {
  children: React.ReactNode;
}

interface Translate {
  x: number;
  y: number;
}

export const CanvasController: React.FC<CanvasControllerProps> = ({ children }) => {
  const [translate, setTranslate] = useState<Translate>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        const deltaScale = e.deltaY > 0 ? 0.95 : 1.05;
        setScale((prevScale) => Math.max(0.1, prevScale * deltaScale));
      } else {
        setTranslate((prevTranslate) => ({
          x: prevTranslate.x - e.deltaX,
          y: prevTranslate.y - e.deltaY,
        }));
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='fixed left-0 top-0 w-full h-full bg-[url("/img/bg.webp")]'>
      <div
        className='absolute left-0 right-0 bottom-0 top-0 m-auto w-full h-full flex justify-center items-center '
        style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
};
