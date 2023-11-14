import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';
import { UnitSelector } from './unit';

describe('unit selector', () => {
  it('should work', () => {
    render(<UnitSelector value='px' onChange={() => {}} />);

    const selectDOM = screen.getByRole('unit-selector') as HTMLSelectElement;
    const options = selectDOM.querySelectorAll('option');

    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();

    expect(selectDOM).toBeInTheDocument();
    expect(selectDOM.value).toEqual('px');
    expect(selectDOM.childElementCount).toEqual(3);
    const units = Array.from(selectDOM.children).map((item) => {
      return item.textContent;
    });
    expect(units).toEqual(['px', '%', 'auto']);
  });

  it('should work when unit changed', async () => {
    const App = () => {
      const [unit, setUnit] = useState<UnitType>('px');
      return <UnitSelector value={unit} onChange={setUnit} />;
    };

    render(<App />);

    const selectDOM = screen.getByRole('unit-selector') as HTMLSelectElement;
    const options = selectDOM.querySelectorAll('option');

    fireEvent.change(selectDOM, { target: { value: '%' } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();

    fireEvent.change(selectDOM, { target: { value: 'auto' } });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
  });
});
