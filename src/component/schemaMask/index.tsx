import { useAtomValue } from "jotai";
import { getDrawingStyleAtom } from "../../store/schema";

export const SchemaMask = () => {
  const drawingStyle = useAtomValue(getDrawingStyleAtom);
  if (drawingStyle) {
    return <div style={drawingStyle} />;
  } else {
    return null;
  }
}
