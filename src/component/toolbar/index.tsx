import { Button } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { selectedDrawTypeAtom } from "../../store/toolbar";
import { styles } from "./index.tv";
import { SchemaType } from "../../types/schema";
import { createSchemaAtom } from "../../store/schema";

const options: string[] = Object.values(SchemaType);

const { container } = styles();

export const Toolbar = () => {
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);
  const createSchema = useSetAtom(createSchemaAtom);

  return (
    <div className={container()}>
      {options.map((type) => {
        const selected = selectedDrawType === type;
        return (
          <Button
            size="sm"
            color="primary"
            key={type}
            onClick={() => setSelectedDrawType(type as SchemaType)}
            variant={selected ? "bordered" : "flat"}
          >
            {type}
          </Button>
        );
      })}
      <Button onClick={createSchema} variant="shadow" color="primary" size="sm" className="ml-auto">
        添加
      </Button>
    </div>
  );
};
