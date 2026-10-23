import type { HTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}
