import { act, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';
import { ComplicatedSizer } from './complicated';

describe('complicated sizer', () => {
  it('should work', () => {
    const renderResult = render(<ComplicatedSizer label='width' value='10px' onChange={(v) => v} />);
    const inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    expect(inputs.length).toEqual(1);
    expect(inputs[0].value).toEqual('10');
    const lockContainer = renderResult.getByLabelText('complicated-lock') as HTMLSpanElement;
    const lock = lockContainer.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(lock.checked).toBeTruthy();
  });

  it('unlock', () => {
    const App = () => {
      const [value, setValue] = useState('10px');
      return <ComplicatedSizer label='width' value={value} onChange={setValue} />;
    };

    const renderResult = render(<App />);
    const lockContainer = renderResult.getByLabelText('complicated-lock') as HTMLSpanElement;
    const lock = lockContainer.querySelector('input[type="checkbox"]') as HTMLInputElement;

    act(() => {
      lock.click();
    });

    const inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    expect(inputs.length).toEqual(4);
    expect(lock.checked).toBeFalsy();
    expect(inputs.map((item) => item.value)).toEqual(['10', '10', '10', '10']);
  });
});
