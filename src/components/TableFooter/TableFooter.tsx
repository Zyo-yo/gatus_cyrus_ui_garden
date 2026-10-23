import { useContext } from 'react';
import styled from 'styled-components';
import { TableDisabledContext } from '../tableState';
import type { TableFooterProps } from './TableFooter.types';

const StyledElement = styled.tfoot<{
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

export function TableFooter({
  children,
  backgroundColor = '#eff6ff',
  textColor = '#111827',
  disabled = false,
  onClick,
  onClickCapture,
  ...props
}: TableFooterProps) {
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
