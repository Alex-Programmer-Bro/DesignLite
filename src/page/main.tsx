import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '../component/canvas';
import { Designer } from '../component/designer';
import { Toolsbar } from '../component/toolsbar';

export const Main = () => {
  const constraints = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <motion.div className='flex h-full flex-col w-screen' ref={constraints}>
        <Toolsbar />
        <Canvas />
      </motion.div>
      <Designer constraints={constraints} />
    </>
  );
};
