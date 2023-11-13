import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { UnitSelector } from './unit';

describe('simple sizer', () => {
  it('should work', async () => {
    render(<UnitSelector value='px' onChange={() => {}} />);
    const selectDOM = screen.getByRole('unit-selector') as HTMLSelectElement;
    expect(selectDOM).toBeInTheDocument();
    expect(selectDOM.value).toEqual('px');
  });
});
