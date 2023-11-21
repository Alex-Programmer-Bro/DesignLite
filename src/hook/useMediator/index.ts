import { designerState } from './constant';
import { useMediator } from './hook';

export const useDesignerMediator = () => {
  return useMediator(designerState);
};
