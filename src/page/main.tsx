import { Canvas } from '../component/canvas';
import { CanvasController } from '../component/canvasController';
import { Designer } from '../component/designer';
import { Toolsbar } from '../component/toolsbar';

export const Main = () => {
  return (
    <>
      <Toolsbar />
      <CanvasController>
        <Canvas />
      </CanvasController>
      <Designer />
    </>
  );
};
