import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';
import { ComplicatedSizer } from './complicated';

describe('complicated sizer', () => {
  it('should work while lock', () => {
    const App = () => {
      const [value, setValue] = useState('10px');
      return <ComplicatedSizer label='width' value={value} onChange={setValue} />;
    };
    render(<App />);
    const inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    const input = inputs[0];
    expect(inputs.length).toEqual(1);
    expect(input.value).toEqual('10');
    const lockContainer = screen.getByLabelText('complicated-lock') as HTMLSpanElement;
    const lock = lockContainer.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(lock.checked).toBeTruthy();
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toEqual('23');
  });

  it('should work while unlock', () => {
    const App = () => {
      const [value, setValue] = useState('10px 20px 10px 10px');
      return <ComplicatedSizer label='width' value={value} onChange={setValue} />;
    };
    render(<App />);
    const inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    expect(inputs.map((item) => item.value)).toEqual(['10', '20', '10', '10']);

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs.map((item) => item.value)).toEqual(['1', '20', '10', '10']);

    fireEvent.change(inputs[1], { target: { value: '2' } });
    expect(inputs.map((item) => item.value)).toEqual(['1', '2', '10', '10']);

    fireEvent.change(inputs[2], { target: { value: '3' } });
    expect(inputs.map((item) => item.value)).toEqual(['1', '2', '3', '10']);

    fireEvent.change(inputs[3], { target: { value: '4' } });
    expect(inputs.map((item) => item.value)).toEqual(['1', '2', '3', '4']);
  });

  it('unlock', () => {
    const App = () => {
      const [value, setValue] = useState('10px');
      return <ComplicatedSizer label='width' value={value} onChange={setValue} />;
    };

    const renderResult = render(<App />);
    const lockContainer = renderResult.getByLabelText('complicated-lock') as HTMLSpanElement;
    const lock = lockContainer.querySelector('input[type="checkbox"]') as HTMLInputElement;

    // unlock
    act(() => {
      lock.click();
    });
    let inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    expect(inputs.length).toEqual(4);
    expect(lock.checked).toBeFalsy();
    expect(inputs.map((item) => item.value)).toEqual(['0', '0', '0', '0']);

    // lock
    act(() => {
      lock.click();
    });
    inputs = screen.getAllByLabelText('simple-sizer') as HTMLInputElement[];
    expect(inputs.length).toEqual(1);
    expect(lock.checked).toBeTruthy();
    expect(inputs.map((item) => item.value)).toEqual(['10']);
  });
});
