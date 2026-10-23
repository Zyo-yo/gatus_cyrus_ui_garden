import type { HTMLAttributes } from 'react';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}
