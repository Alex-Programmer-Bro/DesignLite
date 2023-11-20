import React, { useEffect, useRef } from 'react';

interface CanvasControllerProps {
  children: React.ReactNode;
}

interface Translate {
  x: number;
  y: number;
}

export const CanvasController: React.FC<CanvasControllerProps> = ({ children }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const controller = useRef<{ scale: number; translate: Translate }>({
    translate: { x: 0, y: 0 },
    scale: 1,
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { scale, translate } = controller.current;
      if (e.ctrlKey) {
        const deltaScale = e.deltaY > 0 ? 0.95 : 1.05;
        controller.current.scale = Math.max(0.1, scale * deltaScale);
      } else {
        controller.current.translate = {
          x: translate.x - e.deltaX,
          y: translate.y - e.deltaY,
        };
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const render = () => {
    if (container.current) {
      const { scale, translate } = controller.current;
      container.current.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
    }
    requestAnimationFrame(render);
  };

  render();

  return (
    <div className='fixed left-0 top-0 w-full h-full bg-[url("/img/bg.webp")]'>
      <div
        className='absolute left-0 right-0 bottom-0 top-0 m-auto w-full h-full flex justify-center items-center'
        ref={container}
      >
        {children}
      </div>
    </div>
  );
};
