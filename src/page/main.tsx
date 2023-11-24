import { useAtomValue } from 'jotai';
import { Layout } from '../component/Layout';
import { Meta } from '../component/Meta';
import { Canvas } from '../component/canvas';
import { CanvasController } from '../component/canvasController';
import { Toolsbar } from '../component/toolsbar';
import { drawingSchemaIdAtom } from '../store/schema';

export const Main = () => {
  const id = useAtomValue(drawingSchemaIdAtom);
  const selected = Boolean(id);

  return (
    <>
      <Toolsbar />
      <CanvasController>
        <Canvas />
      </CanvasController>
      {selected && <Meta />}
      {selected && <Layout />}
    </>
  );
};
