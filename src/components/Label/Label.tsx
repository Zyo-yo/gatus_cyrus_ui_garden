import styled from 'styled-components';
import type { LabelProps } from './Label.types';

const StyledLabel = styled.label<{
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}>`
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  font: inherit;
  font-weight: 600;
  overflow-wrap: anywhere;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};

  @media (max-width: 480px) {
    padding: 6px 8px;
  }
`;

export function Label({
  text,
  backgroundColor = '#eff6ff',
  textColor = '#1e3a8a',
  disabled = false,
  onClick,
  onClickCapture,
  ...props
}: LabelProps) {
  return (
    <StyledLabel
      {...props}
      aria-disabled={disabled}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $disabled={disabled}
      onClickCapture={(event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClickCapture?.(event);
      }}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </StyledLabel>
  );
}
