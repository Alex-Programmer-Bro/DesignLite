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
    expect(maskElement.style.cssText).toMatchInlineSnapshot(
      '"position: absolute; border: 1px solid #7272ff; pointer-events: none; left: 0px; top: 0px; width: 100px; height: 100px;"',
    );
    document.body.removeChild(mockElement);
  });
});
