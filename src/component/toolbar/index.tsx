import { Button } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { selectedDrawTypeAtom } from "../../store/toolbar";
import { styles } from './index.tv';
import { SchemaType } from "../../types/schema";
import { createSchemaAtom, resetAtom } from "../../store/schema";

const options: string[] = Object.values(SchemaType);

const { container, item } = styles();

export const Toolbar = () => {
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);
  const createSchema = useSetAtom(createSchemaAtom);
  const reset = useSetAtom(resetAtom);

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
    <div className="ml-auto">
      <Button onClick={createSchema} variant="shadow" color="primary" size="sm" >添加</Button>
      <Button onClick={reset} variant="shadow" size="sm" className="ml-2">重置</Button>
    </div>
  </div>;
};
