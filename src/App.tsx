import { Canvas } from './component/canvas';
import { Designer } from './component/designer';
import { Toolsbar } from "./component/toolsbar";

function App() {
  return (
    <div className='flex h-full'>
      <div className='h-full flex-1 border-r-1 border-solid border-[#ddd]'>
        <Toolsbar />
        <Canvas />
      </div>
      <Designer />
    </div>
  );
}

export default App;
