import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Button } from './Button';

test('renders a visible button', () => {
  render(<Button label="Save" />);
  expect(screen.getByRole('button', { name: 'Save' })).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(
    <Button label="Save" backgroundColor="#2563eb" />
  );
  expect(screen.getByRole('button')).toHaveStyleRule(
    'background-color', '#2563eb'
  );

  rerender(<Button label="Save" backgroundColor="#2563eb" disabled />);
  expect(screen.getByRole('button')).toHaveStyleRule(
    'background-color', '#d1d5db', { modifier: ':disabled' }
  );
  expect(screen.getByRole('button')).toBeDisabled();
});

test('blocks clicks when disabled', () => {
  const onClick = jest.fn();
  render(<Button label="Save" disabled onClick={onClick} />);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});
