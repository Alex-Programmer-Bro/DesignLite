import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';
import { SimpleSizer } from './simple';

describe('simple sizer', () => {
  it('should work', () => {
    render(<SimpleSizer labelPlacement='inside' label='width' value='10px' onChange={(v) => v} />);
    const input = screen.getByLabelText('simple-sizer') as HTMLInputElement;
    expect(input.value).toEqual('10');
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toEqual('23');
  });

  it('change unit of auto', () => {
    const App = () => {
      const [value, setValue] = useState('10px');
      return <SimpleSizer labelPlacement='inside' label='width' value={value} onChange={setValue} />;
    };

    render(<App />);

    const selectDOM = screen.getByRole('unit-selector') as HTMLSelectElement;
    const input = screen.getByLabelText('simple-sizer') as HTMLInputElement;

    fireEvent.change(selectDOM, { target: { value: 'auto' } });
    expect(input.value).toEqual('');

    fireEvent.change(selectDOM, { target: { value: 'px' } });
    expect(input.value).toEqual('10');

    fireEvent.change(selectDOM, { target: { value: '%' } });
    expect(input.value).toEqual('10');
  });
});
