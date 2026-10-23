import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { TableHeader } from './TableHeader';

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    <table>
      <TableHeader data-testid="subject" backgroundColor="#eff6ff"
        disabled={disabled}>
        <tr><th scope="col">Course</th><th scope="col">Status</th></tr>
      </TableHeader>
    </table>
  );
}

test('renders a visible TableHeader', () => {
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
