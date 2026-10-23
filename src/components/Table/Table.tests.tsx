import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Table } from './Table';

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    
      <Table data-testid="subject" backgroundColor="#ffffff"
        disabled={disabled}>
        <><thead><tr><th scope="col">Course</th><th scope="col">Status</th></tr></thead><tbody><tr><td>React</td><td>Complete</td></tr></tbody><tfoot><tr><td colSpan={2}>1 course</td></tr></tfoot></>
      </Table>
    
  );
}

test('renders a visible Table', () => {
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
