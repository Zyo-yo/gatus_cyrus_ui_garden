import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { Dropdown } from './Dropdown';

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
];

test('renders a visible dropdown with an accessible label', () => {
  render(<Dropdown label="Course" options={options} />);
  expect(screen.getByRole('combobox', { name: 'Course' })).toBeVisible();
});

test('changes the background colour when disabled', () => {
  const { rerender } = render(
    <Dropdown label="Course" options={options} backgroundColor="#ffffff" />
  );
  expect(screen.getByRole('combobox')).toHaveStyleRule(
    'background-color', '#ffffff'
  );

  rerender(
    <Dropdown label="Course" options={options}
      backgroundColor="#ffffff" disabled />
  );
  expect(screen.getByRole('combobox')).toHaveStyleRule(
    'background-color', '#d1d5db', { modifier: ':disabled' }
  );
  expect(screen.getByRole('combobox')).toBeDisabled();
});

test('allows selection when enabled', () => {
  const onChange = jest.fn();
  render(<Dropdown label="Course" options={options} onChange={onChange} />);
  userEvent.selectOptions(screen.getByRole('combobox'), 'typescript');
  expect(screen.getByRole('combobox')).toHaveValue('typescript');
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('blocks selection when disabled', () => {
  const onChange = jest.fn();
  render(
    <Dropdown label="Course" options={options} disabled onChange={onChange} />
  );
  userEvent.selectOptions(screen.getByRole('combobox'), 'typescript');
  expect(screen.getByRole('combobox')).toHaveValue('react');
  expect(onChange).not.toHaveBeenCalled();
});
