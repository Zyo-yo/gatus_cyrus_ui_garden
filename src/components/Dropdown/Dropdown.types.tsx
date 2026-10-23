import type { SelectHTMLAttributes } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: DropdownOption[];
  backgroundColor?: string;
  textColor?: string;
}
