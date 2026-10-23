import styled from 'styled-components';
import type { ButtonProps } from './Button.types';

const StyledButton = styled.button<{
  $backgroundColor: string;
  $textColor: string;
}>`
  box-sizing: border-box;
  max-width: 100%;
  min-height: 44px;
  padding: 12px 24px;
  border: 0;
  border-radius: 8px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  font: inherit;
  font-weight: 600;
  overflow-wrap: anywhere;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid #111827;
    outline-offset: 3px;
  }

  &:disabled {
    background-color: #d1d5db;
    color: #4b5563;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 16px;
  }
`;

export function Button({
  label,
  backgroundColor = '#2563eb',
  textColor = '#ffffff',
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      {...props}
      type={type}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
    >
      {label}
    </StyledButton>
  );
}
