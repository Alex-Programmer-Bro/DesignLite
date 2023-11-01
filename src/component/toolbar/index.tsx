import { Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import { selectedDrawTypeAtom } from "../../store/toolbar";
import { DrawType } from "../../store/toolbar/type";
import { styles } from './index.tv';

const options: string[] = [
  DrawType.rect,
  DrawType.text
];

const { container, item } = styles();

export const Toolbar = () => {
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);

  return <div className={container()}>
    {
      options.map(type => {
        const selected = selectedDrawType === type;
        return <Button
          key={type}
          className={item()}
          onClick={() => setSelectedDrawType(type as DrawType)}
          variant={selected ? 'faded' : 'light'}
        >
          {type}
        </Button>
      })
    }
  </div>;
};
