import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Text } from './Text';

test('renders visible text', () => {
  render(<Text text="Welcome to the library" />);
  expect(screen.getByText('Welcome to the library')).toBeVisible();
});

test('changes its background colour when disabled', () => {
  const { rerender } = render(
    <Text text="Welcome" backgroundColor="#f3f4f6" />
  );
  expect(screen.getByText('Welcome')).toHaveStyleRule(
    'background-color', '#f3f4f6'
  );

  rerender(<Text text="Welcome" backgroundColor="#f3f4f6" disabled />);
  expect(screen.getByText('Welcome')).toHaveStyleRule(
    'background-color', '#d1d5db'
  );
  expect(screen.getByText('Welcome')).toHaveStyleRule(
    'cursor', 'not-allowed'
  );
});

test('blocks its click handler when disabled', () => {
  const onClick = jest.fn();
  render(<Text text="Welcome" disabled onClick={onClick} />);
  fireEvent.click(screen.getByText('Welcome'));
  expect(onClick).not.toHaveBeenCalled();
});
