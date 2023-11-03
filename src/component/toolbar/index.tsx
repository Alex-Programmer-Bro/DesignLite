import { Button } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { selectedDrawTypeAtom } from "../../store/toolbar";
import { styles } from './index.tv';
import { SchemaType } from "../../types/schema";
import { createSchemaAtom } from "../../store/schema";

const options: string[] = Object.values(SchemaType);

const { container, item } = styles();

export const Toolbar = () => {
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);
  const createSchema = useSetAtom(createSchemaAtom);

  return <div className={container()}>
    {
      options.map(type => {
        const selected = selectedDrawType === type;
        return <Button
          size="sm"
          key={type}
          className={item()}
          onClick={() => setSelectedDrawType(type as SchemaType)}
          variant={selected ? 'faded' : 'light'}
        >
          {type}
        </Button>
      })
    }
    <Button onClick={createSchema} variant="shadow" color="primary" size="sm" className="ml-auto">添加</Button>
  </div>;
};
