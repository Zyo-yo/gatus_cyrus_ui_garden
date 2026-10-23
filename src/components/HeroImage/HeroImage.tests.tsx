import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { HeroImage } from './HeroImage';

const props = {
  src: '/images/garden.svg',
  alt: 'Green hills',
  title: 'Garden',
  description: 'Explore our garden',
};

test('renders a visible component and accessible image', () => {
  render(<HeroImage {...props} data-testid="subject" />);
  expect(screen.getByTestId('subject')).toBeVisible();
  expect(screen.getByRole('img', { name: 'Green hills' })).toBeVisible();
  expect(screen.getByText('Garden')).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(
    <HeroImage {...props} data-testid="subject"
      backgroundColor="#0f172a" />
  );
  expect(screen.getByTestId('subject')).toHaveStyleRule(
    'background-color', '#0f172a'
  );

  rerender(
    <HeroImage {...props} data-testid="subject"
      backgroundColor="#0f172a" disabled />
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
  render(<HeroImage {...props} disabled onClick={onClick} />);
  fireEvent.click(screen.getByRole('img'));
  expect(onClick).not.toHaveBeenCalled();
});
