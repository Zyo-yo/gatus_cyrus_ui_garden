import { useId } from 'react';
import styled from 'styled-components';
import type { DropdownProps } from './Dropdown.types';

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Caption = styled.label`
  display: block;
  margin-bottom: 8px;
  font: inherit;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Select = styled.select<{
  $backgroundColor: string;
  $textColor: string;
}>`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 12px;
  border: 1px solid #6b7280;
  border-radius: 6px;
  font: inherit;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #d1d5db;
    color: #4b5563;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export function Dropdown({
  label,
  options,
  backgroundColor = '#ffffff',
  textColor = '#111827',
  disabled = false,
  id,
  ...props
}: DropdownProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <Wrapper>
      <Caption htmlFor={selectId}>{label}</Caption>
      <Select
        {...props}
        id={selectId}
        disabled={disabled}
        $backgroundColor={backgroundColor}
        $textColor={textColor}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
