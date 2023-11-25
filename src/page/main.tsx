import { useAtomValue } from 'jotai';
import { Canvas } from '../component/Canvas';
import { Layout } from '../component/Layout';
import { Meta } from '../component/Meta';
import { CanvasController } from '../component/canvasController';
import { Toolsbar } from '../component/toolsbar';
import { selectedSchemaAtom } from '../store/schema';

export const Main = () => {
  const selectedSchema = useAtomValue(selectedSchemaAtom);
  return (
    <>
      <Toolsbar />
      <CanvasController>
        <Canvas />
      </CanvasController>
      {selectedSchema && <Meta />}
      {selectedSchema && <Layout />}
    </>
  );
};
