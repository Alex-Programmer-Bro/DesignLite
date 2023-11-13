import { DevTools } from 'jotai-devtools';
import { useDebug } from '../../hook/useDebug';
import { appStore } from '../../store';

export const DevTool = () => {
  const debug = useDebug();
  if (!debug) return null;
  return <DevTools store={appStore} />;
};
