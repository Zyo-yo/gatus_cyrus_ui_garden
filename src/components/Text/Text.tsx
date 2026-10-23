import styled from 'styled-components';
import type { TextProps } from './Text.types';

const StyledText = styled.p<{
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  max-width: 65ch;
  margin: 0;
  padding: 16px;
  border-radius: 6px;
  font: inherit;
  line-height: 1.6;
  overflow-wrap: anywhere;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export function Text({
  text,
  backgroundColor = '#f3f4f6',
  textColor = '#111827',
  disabled = false,
  onClick,
  onClickCapture,
  ...props
}: TextProps) {
  return (
    <StyledText
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
    </StyledText>
  );
}
