import { atomWithReset } from 'jotai/utils';

export const designerState = {
  display: 'inline-block',
  width: '0px',
  height: '0px',
  margin: '0px',
  padding: '0px',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
  fontSize: '14px',
  color: '#000000',
  fontWeight: '400',
  textDecoration: 'auto',
  fontStyle: 'inherit',
  textAlign: 'left',
  content: '',
  imgURL: '',
};

export const designerAtom = atomWithReset({ ...designerState });
designerAtom.debugLabel = 'Designer';
