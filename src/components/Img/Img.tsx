import styled from 'styled-components';
import type { ImgProps } from './Img.types';

interface VisualProps {
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}

const Frame = styled.figure<VisualProps>`
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
    opacity: ${({ $disabled }) => $disabled ? 0.35 : 1};
    filter: ${({ $disabled }) => $disabled ? 'grayscale(1)' : 'none'};
  }

  figcaption {
    margin-top: 10px;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export function Img({
  src,
  alt,
  title,
  description = '',
  backgroundColor = '#eff6ff',
  textColor = '#111827',
  disabled = false,
  children,
  onClick,
  onClickCapture,
  ...props
}: ImgProps) {
  return (
    <Frame
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

        <img src={src} alt={alt} />
        <figcaption>{title}</figcaption>

    </Frame>
  );
}
