import { lazy } from 'react';

export const ChromePicker = lazy(async () => {
  const { ChromePicker } = await import('react-color');
  return { default: ChromePicker };
})
