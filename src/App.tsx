import { Canvas } from "./component/canvas";
import { Designer } from "./component/designer";
import { Toolsbar } from "./component/toolsbar";

function App() {
  return (
    <>
      <div className="flex h-full flex-col">
        <Toolsbar />
        <Canvas />
      </div>
      <div className="fixed right-0 top-8">
        <Designer />
      </div>
    </>
  );
}

export default App;
