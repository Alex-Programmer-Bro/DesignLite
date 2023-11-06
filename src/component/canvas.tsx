import { useAtomValue } from "jotai";
import { schemasAtom } from "../store/schema";
import { SchemaRender } from "./schemaRender";

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);

  return (
    <div className="w-[calc(100vw-300px)] flex-1 overflow-auto box-border relative ">
      <div className="shadow-medium  bg-white m-16">
        {schemas.map((item) => (
          <SchemaRender key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
