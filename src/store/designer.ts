import { atomWithReset } from 'jotai/utils';

export const layoutState = {
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
};

export const layoutStateAtom = atomWithReset({ ...layoutState });
layoutStateAtom.debugLabel = 'Layout';


