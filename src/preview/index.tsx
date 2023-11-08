import { useAtomValue } from "jotai";
import { useTitle } from "../hook/useTitle";
import { schemasAtom } from "../store/schema";

export const Preview = () => {
  useTitle('FPS - Preview');
  const schemas = useAtomValue(schemasAtom);
  console.log(schemas);
  return <div>123</div>;
};
