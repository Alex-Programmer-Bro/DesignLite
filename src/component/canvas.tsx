import { useAtomValue } from "jotai";
import { schemasAtom } from "../store/schema";
import { SchemaRender } from "./schemaRender";

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);

  return <div className="overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
    {
      schemas.map(item => <SchemaRender key={item.id} {...item} />)
    }
  </div>
};
