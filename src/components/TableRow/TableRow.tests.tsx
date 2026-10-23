import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { TableRow } from './TableRow';

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    <table><tbody>
      <TableRow data-testid="subject" backgroundColor="#ffffff"
        disabled={disabled}>
        <><td>React</td><td>Complete</td></>
      </TableRow>
    </tbody></table>
  );
}

test('renders a visible TableRow', () => {
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
