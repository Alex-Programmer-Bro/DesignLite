import { act, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { SchemaMask } from '.';

describe('complicated sizer', () => {
  it('should be null', () => {
    render(<SchemaMask />);
    expect(screen.queryByLabelText('schema-mask')).toBeNull();
  });

  it('should be null while id is not exist', () => {
    const App = () => {
      return (
        <div>
          <div id='hello'>123</div>
          <SchemaMask id='world' />
        </div>
      );
    };
    render(<App />);
    expect(screen.queryByLabelText('schema-mask')).toBeNull();
  });

  it('should be visible and changeable', async () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-id';
    document.body.appendChild(mockElement);

    render(<SchemaMask id='test-id' />);

    await act(async () => {
      mockElement.style.width = '100px';
      mockElement.style.height = '100px';
    });

    const maskElement = screen.getByLabelText('schema-mask');

    expect(maskElement).toBeInTheDocument();
    expect(maskElement.style.width).toEqual('100px');
    expect(maskElement.style.height).toEqual('100px');

    await act(async () => {
      mockElement.style.width = 'auto';
      mockElement.style.height = 'auto';
    });

    expect(maskElement.style.width).toEqual('0px');
    expect(maskElement.style.height).toEqual('0px');

    document.body.removeChild(mockElement);
  });
});
