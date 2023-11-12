import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from './component/canvas';
import { Designer } from './component/designer';
import { Toolsbar } from './component/toolsbar';

function App() {
  const constraints = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <motion.div className='flex h-full flex-col w-screen' ref={constraints}>
        <Toolsbar />
        <Canvas />
      </motion.div>
      <motion.div drag dragMomentum={false} dragConstraints={constraints} className='w-[400px] fixed top-6 right-0'>
        <Designer />
      </motion.div>
    </>
  );
}

export default App;
