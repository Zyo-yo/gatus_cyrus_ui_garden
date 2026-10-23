import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('showcase toggle disables and re-enables the form components', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: 'Try the button' });
  const toggle = screen.getByRole('checkbox', {
    name: 'Disable all showcase components',
  });

  userEvent.click(button);
  expect(screen.getByRole('status')).toHaveTextContent('Button clicks: 1');

  userEvent.click(toggle);
  expect(button).toBeDisabled();
  expect(screen.getByRole('combobox')).toBeDisabled();
  screen.getAllByRole('radio').forEach((radio) => {
    expect(radio).toBeDisabled();
  });

  userEvent.click(button);
  expect(screen.getByRole('status')).toHaveTextContent('Button clicks: 1');

  userEvent.click(toggle);
  expect(button).toBeEnabled();
  userEvent.click(button);
  expect(screen.getByRole('status')).toHaveTextContent('Button clicks: 2');
});
