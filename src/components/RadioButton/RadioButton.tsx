import { useId } from 'react';
import styled from 'styled-components';
import type { RadioButtonProps } from './RadioButton.types';

const Wrapper = styled.label<{
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  min-height: 44px;
  max-width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  font: inherit;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 12px;
  }
`;

const Input = styled.input`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: #2563eb;
  cursor: inherit;

  &:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 3px;
  }
`;

const Caption = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

export function RadioButton({
  label,
  backgroundColor = '#eff6ff',
  textColor = '#111827',
  disabled = false,
  id,
  ...props
}: RadioButtonProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Wrapper
      htmlFor={inputId}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $disabled={disabled}
    >
      <Input {...props} id={inputId} type="radio" disabled={disabled} />
      <Caption>{label}</Caption>
    </Wrapper>
  );
}
