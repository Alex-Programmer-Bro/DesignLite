import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { drawingSchemaIdAtom, schemasAtom } from "../store/schema";
import { allowSelectAtom } from "../store/toolbar";
import { SchemaRender } from "./schemaRender";

export const Canvas = () => {
  const schemas = useAtomValue(schemasAtom);
  const setDrawingScheamId = useSetAtom(drawingSchemaIdAtom);
  const allowSelect = useAtomValue(allowSelectAtom);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSelect) return;
    const element = event.target as HTMLDivElement;
    if (!element.id) return;
    setDrawingScheamId(element.id);
  };

  return (
    <div className="overflow-auto" style={{ height: "calc(100% - 40px)" }} onClick={handleClick}>
      {schemas.map((item) => (
        <SchemaRender key={item.id} {...item} />
      ))}
    </div>
  );
};
