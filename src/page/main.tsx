import { Canvas } from '../component/canvas';
import { Designer } from '../component/designer';
import { Toolsbar } from '../component/toolsbar';

export const Main = () => {
  return (
    <>
      <div className='flex h-full flex-col w-screen'>
        <Toolsbar />
        <Canvas />
      </div>
      <Designer />
    </>
  );
};
