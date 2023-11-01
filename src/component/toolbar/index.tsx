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
        return <div
          key={type}
          className={item({ selected })}
          onClick={() => setSelectedDrawType(type as DrawType)}
        >
          {type}
        </div>
      })
    }
  </div>;
};
