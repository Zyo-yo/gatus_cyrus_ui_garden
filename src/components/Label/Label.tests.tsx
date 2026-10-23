import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Label } from './Label';

test('renders a visible label associated with its input', () => {
  render(
    <>
      <Label text="Email address" htmlFor="email" />
      <input id="email" />
    </>
  );
  expect(screen.getByText('Email address')).toBeVisible();
  expect(screen.getByLabelText('Email address')).toBeVisible();
});

test('changes its background colour when disabled', () => {
  const { rerender } = render(
    <Label text="Email address" backgroundColor="#eff6ff" />
  );
  expect(screen.getByText('Email address')).toHaveStyleRule(
    'background-color', '#eff6ff'
  );

  rerender(
    <Label text="Email address" backgroundColor="#eff6ff" disabled />
  );
  expect(screen.getByText('Email address')).toHaveStyleRule(
    'background-color', '#d1d5db'
  );
  expect(screen.getByText('Email address')).toHaveStyleRule(
    'cursor', 'not-allowed'
  );
});

test('blocks activation of the associated input when disabled', () => {
  const onClick = jest.fn();
  render(
    <>
      <Label text="Subscribe" htmlFor="subscribe" disabled onClick={onClick} />
      <input id="subscribe" type="checkbox" />
    </>
  );
  fireEvent.click(screen.getByText('Subscribe'));
  expect(screen.getByLabelText('Subscribe')).not.toBeChecked();
  expect(onClick).not.toHaveBeenCalled();
});
