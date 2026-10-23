import styled from 'styled-components';
import type { CardProps } from './Card.types';

interface VisualProps {
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}

const Frame = styled.article<VisualProps>`
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  border: 1px solid #9ca3af;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 1;
    object-fit: cover;
    opacity: ${({ $disabled }) => $disabled ? 0.35 : 1};
    filter: ${({ $disabled }) => $disabled ? 'grayscale(1)' : 'none'};
  }

  .card-content {
    padding: 24px;
  }

  h2 {
    margin: 0 0 12px;
    font-size: 1.5rem;
    overflow-wrap: anywhere;
  }

  p {
    margin: 0;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    .card-content {
      padding: 16px;
    }
  }
`;

export function Card({
  src,
  alt,
  title,
  description = '',
  backgroundColor = '#ffffff',
  textColor = '#111827',
  disabled = false,
  children,
  onClick,
  onClickCapture,
  ...props
}: CardProps) {
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
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>

    </Frame>
  );
}
