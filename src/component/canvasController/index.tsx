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

  const spacePressed = useRef<boolean>(false);
  const mousePressed = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spacePressed.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spacePressed.current = false;
      }
    };

    const handleMouseDown = () => {
      mousePressed.current = true;
    };

    const handleMouseUp = () => {
      mousePressed.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (spacePressed.current && mousePressed.current) {
        const { translate } = controller.current;
        controller.current.translate = {
          x: translate.x + e.movementX,
          y: translate.y + e.movementY,
        };
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { scale, translate } = controller.current;
      const { clientX, clientY } = e;
      if (e.ctrlKey) {
        const deltaScale = e.deltaY > 0 ? 0.95 : 1.05;
        const newScale = parseFloat(Math.max(0.1, scale * deltaScale).toFixed(2));

        const { innerWidth, innerHeight } = window;

        controller.current.scale = newScale;

        const mouseX = clientX - innerWidth / 2 - translate.x;
        const mouseY = innerHeight / 2 - clientY + translate.y;
        const dx = mouseX * (1 - 1 / deltaScale);
        const dy = mouseY * (1 - 1 / deltaScale);

        controller.current.translate = {
          x: translate.x - dx,
          y: translate.y + dy,
        };
      } else {
        controller.current.translate = {
          x: translate.x - e.deltaX,
          y: translate.y - e.deltaY,
        };
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
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
