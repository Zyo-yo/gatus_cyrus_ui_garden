import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { TableCell } from './TableCell';

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    <table><tbody><tr>
      <TableCell data-testid="subject" backgroundColor="#ffffff"
        disabled={disabled}>
        {'React'}
      </TableCell>
    </tr></tbody></table>
  );
}

test('renders a visible TableCell', () => {
  render(<Example />);
  expect(screen.getByTestId('subject')).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(<Example />);
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'background-color', '#ffffff'
  );

  rerender(<Example disabled />);
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'background-color', '#d1d5db'
  );
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'cursor', 'not-allowed'
  );
  expect(screen.getByTestId('subject')).toHaveAttribute(
    'aria-disabled', 'true'
  );
});
