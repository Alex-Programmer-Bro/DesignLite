import { useAtomValue } from "jotai";
import { schemasAtom } from "../store/schema";
import { SchemaRender } from "./schemaRender";
import { useEffect, useRef, useState } from "react";

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
      params.current.scale = scale - 0.01 < 0.5 ? 0.5 : scale - 0.01;
    } else {
      params.current.scale = (scale + 0.01) % 3;
    }
  };

  const startDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDrag(true);
    let targetX = 0;
    let targetY = 0;
    const targetElement = container.current;
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect();
      console.log(targetRect);
      // targetX = targetRect.left;
      // targetY = targetRect.top;
    }
    console.log({
      targetX,
      targetY
    });

    params.current.startX = event.clientX - targetX;
    params.current.startY = event.clientY - targetY;
  };

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isDrag) return;
    const { scale, startX, startY } = params.current;

    params.current.top = event.clientY - event.currentTarget.offsetTop - startX;
    params.current.left = event.clientX - event.currentTarget.offsetLeft - startY;
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

  useEffect(animation, [params]);

  return (
    <div
      className="flex-1 w-full overflow-hidden  relative bg-teal-900"
      onWheel={handlScale}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={handleDrag}
    >
      <div className=" absolute left-0 top-0 shadow-medium bg-white w-[1920px] min-h-[1080px]" ref={container}>
        {schemas.map((item) => (
          <SchemaRender key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
