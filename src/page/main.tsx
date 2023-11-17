import { Canvas } from '../component/canvas';
import { Designer } from '../component/designer';
import { Toolsbar } from '../component/toolsbar';

export const Main = () => {
  return (
    <>
      <Toolsbar />
      <Canvas />
      <Designer />
    </>
  );
};
