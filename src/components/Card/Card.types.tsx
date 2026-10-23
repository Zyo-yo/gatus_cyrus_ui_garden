import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}
