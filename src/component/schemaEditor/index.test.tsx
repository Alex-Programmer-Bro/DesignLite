import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { SchemaEditor } from '.';

describe('complicated sizer', () => {
  it('should be null', () => {
    render(<SchemaEditor />);
    expect(screen.queryByLabelText('schema-mask')).toBeNull();
  });

  it('should be null while id is not exist', () => {
    const App = () => {
      return (
        <div>
          <div id='hello'>123</div>
          <SchemaEditor id='world' />
        </div>
      );
    };
    render(<App />);
    expect(screen.queryByLabelText('schema-mask')).toBeNull();
  });
});
