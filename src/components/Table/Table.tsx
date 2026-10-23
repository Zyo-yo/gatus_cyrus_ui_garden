import { useContext } from 'react';
import styled from 'styled-components';
import { TableDisabledContext } from '../tableState';
import type { TableProps } from './Table.types';

const ScrollArea = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
`;

const StyledElement = styled.table<{
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

  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th, td {
    padding: 12px;
    border: 1px solid #9ca3af;
    text-align: left;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    th, td {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

export function Table({
  children,
  backgroundColor = '#ffffff',
  textColor = '#111827',
  disabled = false,
  onClick,
  onClickCapture,
  ...props
}: TableProps) {
  const parentDisabled = useContext(TableDisabledContext);
  const isDisabled = disabled || parentDisabled;

  return (
    <TableDisabledContext.Provider value={isDisabled}>
      <ScrollArea>
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
      </ScrollArea>
    </TableDisabledContext.Provider>
  );
}
