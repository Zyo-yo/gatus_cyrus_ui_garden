import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Img } from './Img';

const props = {
  src: '/images/garden.svg',
  alt: 'Green hills',
  title: 'Garden',
  description: 'Explore our garden',
};

test('renders a visible component and accessible image', () => {
  render(<Img {...props} data-testid="subject" />);
  expect(screen.getByTestId('subject')).toBeVisible();
  expect(screen.getByRole('img', { name: 'Green hills' })).toBeVisible();
  expect(screen.getByText('Garden')).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(
    <Img {...props} data-testid="subject"
      backgroundColor="#eff6ff" />
  );
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'background-color', '#eff6ff'
  );

  rerender(
    <Img {...props} data-testid="subject"
      backgroundColor="#eff6ff" disabled />
  );
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

test('blocks its click handler when disabled', () => {
  const onClick = jest.fn();
  render(<Img {...props} disabled onClick={onClick} />);
  fireEvent.click(screen.getByRole('img'));
  expect(onClick).not.toHaveBeenCalled();
});
