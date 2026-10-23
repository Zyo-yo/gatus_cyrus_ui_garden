import styled from 'styled-components';
import type { HeroImageProps } from './HeroImage.types';

interface VisualProps {
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}

const Frame = styled.section<VisualProps>`
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  width: 100%;
  min-height: 320px;
  display: grid;
  align-items: center;
  padding: 48px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};

  img {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ $disabled }) => $disabled ? 0.12 : 0.25};
    filter: ${({ $disabled }) => $disabled ? 'grayscale(1)' : 'none'};
  }

  h2 {
    margin: 0 0 16px;
    font-size: clamp(1.75rem, 5vw, 3rem);
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  p {
    margin: 0;
    max-width: 60ch;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    min-height: 240px;
    padding: 24px;
  }
`;

export function HeroImage({
  src,
  alt,
  title,
  description = '',
  backgroundColor = '#0f172a',
  textColor = '#ffffff',
  disabled = false,
  children,
  onClick,
  onClickCapture,
  ...props
}: HeroImageProps) {
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
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>

    </Frame>
  );
}
