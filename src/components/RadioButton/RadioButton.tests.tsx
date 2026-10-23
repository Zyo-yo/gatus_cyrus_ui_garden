import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { RadioButton } from './RadioButton';

test('renders a visible radio button', () => {
  render(<RadioButton label="Standard delivery" />);
  expect(screen.getByRole('radio', { name: 'Standard delivery' })).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(
    <RadioButton label="Standard delivery" backgroundColor="#eff6ff" />
  );
  expect(screen.getByText('Standard delivery').parentElement).toHaveStyleRule(
    'background-color', '#eff6ff'
  );

  rerender(
    <RadioButton label="Standard delivery"
      backgroundColor="#eff6ff" disabled />
  );
  expect(screen.getByText('Standard delivery').parentElement).toHaveStyleRule(
    'background-color', '#d1d5db'
  );
  expect(screen.getByRole('radio')).toBeDisabled();
});

test('selects only one radio button in a group', () => {
  render(
    <>
      <RadioButton label="Standard" name="delivery" value="standard" />
      <RadioButton label="Express" name="delivery" value="express" />
    </>
  );
  userEvent.click(screen.getByRole('radio', { name: 'Standard' }));
  expect(screen.getByRole('radio', { name: 'Standard' })).toBeChecked();
  userEvent.click(screen.getByRole('radio', { name: 'Express' }));
  expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Standard' })).not.toBeChecked();
});

test('blocks selection when disabled', () => {
  const onChange = jest.fn();
  render(<RadioButton label="Standard" disabled onChange={onChange} />);
  userEvent.click(screen.getByRole('radio'));
  expect(screen.getByRole('radio')).not.toBeChecked();
  expect(onChange).not.toHaveBeenCalled();
});
