import { useSearchParams } from 'react-router-dom';

export const useDebug = () => {
  const [params] = useSearchParams();
  return params.has('debug');
};
