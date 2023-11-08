import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { schemasAtom } from "../store/schema";
import { SchemaRender } from "./schemaRender";

interface CanvasParams {
  startX: number;
  startY: number;
  top: number;
  left: number;
  scale: number;
}

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);

  const container = useRef<HTMLDivElement | null>(null);
  const params = useRef<CanvasParams>({ startX: 0, startY: 0, top: 0, left: 0, scale: 1 });
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handlScale = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const delta = event.deltaX || event.deltaY;

    const { scale } = params.current;

    if (delta > 0) {
      params.current.scale = scale - 0.01 < 0.1 ? 0.1 : scale - 0.01;
    } else {
      params.current.scale = scale + 0.01 > 3 ? 3 : scale + 0.01;
    }
  };

  const startDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDrag(true);
    const { scale } = params.current;
    let targetX = 0;
    let targetY = 0;
    if (container.current) {
      const target = container.current.getBoundingClientRect();
      targetX = target.x;
      targetY = target.y;
    }

    const startX = event.clientX - targetX;
    const startY = event.clientY - targetY;

    params.current.startX = startX;
    params.current.startY = startY;
  };

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isDrag) return;
    const { startX, startY } = params.current;
    params.current.top = event.clientY - startY - event.currentTarget.offsetTop;
    params.current.left = event.clientX - startX - event.currentTarget.offsetLeft;
  };

  const stopDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDrag(false);
  };

  const animation = () => {
    if (container.current) {
      const { scale, top, left } = params.current;
      container.current.style.transform = `scale(${scale})`;
      container.current.style.top = `${top}px`;
      container.current.style.left = `${left}px`;
    }
    requestAnimationFrame(animation);
  };

  useEffect(() => {
    animation();
    const scale = window.innerWidth / 1920 - 0.25;
    params.current.scale = scale < 0.1 ? 0.1 : scale;
    params.current.left = 30;
    params.current.top = 30;
  }, []);

  return (
    <div
      className="flex-1 w-full overflow-hidden  relative bg-teal-900"
      onWheel={handlScale}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={handleDrag}
    >
      <div className=" absolute shadow-medium bg-white w-[1920px] min-h-[1080px] origin-top-left" ref={container}>
        {schemas.map((item) => (
          <SchemaRender key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
