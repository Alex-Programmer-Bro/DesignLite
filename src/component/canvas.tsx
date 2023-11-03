import { useAtomValue } from "jotai";
import { schemasAtom } from "../store/schema";
import { SchemaRender } from "./schemaRender";

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);

  return <div>
    {
      schemas.map(item => <SchemaRender key={item.id} {...item} />)
    }
  </div>
};
