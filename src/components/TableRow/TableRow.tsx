import { useContext } from 'react';
import styled from 'styled-components';
import { TableDisabledContext } from '../tableState';
import type { TableRowProps } from './TableRow.types';

const StyledElement = styled.tr<{
  $backgroundColor: string;
  $textColor: string;
  $disabled: boolean;
}>`
  box-sizing: border-box;
  font: inherit;
  background-color: ${({ $disabled, $backgroundColor }) =>
    $disabled ? '#d1d5db' : $backgroundColor};
  color: ${({ $disabled, $textColor }) =>
    $disabled ? '#4b5563' : $textColor};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'default'};
`;

export function TableRow({
  children,
  backgroundColor = '#ffffff',
  textColor = '#111827',
  disabled = false,
  onClick,
  onClickCapture,
  ...props
}: TableRowProps) {
  const parentDisabled = useContext(TableDisabledContext);
  const isDisabled = disabled || parentDisabled;

  return (
    <TableDisabledContext.Provider value={isDisabled}>
      
      <StyledElement
        {...props}
        aria-disabled={isDisabled}
        $backgroundColor={backgroundColor}
        $textColor={textColor}
        $disabled={isDisabled}
        onClickCapture={(event) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          onClickCapture?.(event);
        }}
        onClick={isDisabled ? undefined : onClick}
      >
        {children}
      </StyledElement>
      
    </TableDisabledContext.Provider>
  );
}
