import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { TableFooter } from './TableFooter';

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    <table>
      <TableFooter data-testid="subject" backgroundColor="#eff6ff"
        disabled={disabled}>
        <tr><td colSpan={2}>1 course</td></tr>
      </TableFooter>
    </table>
  );
}

test('renders a visible TableFooter', () => {
  render(<Example />);
  expect(screen.getByTestId('subject')).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(<Example />);
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'background-color', '#eff6ff'
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
