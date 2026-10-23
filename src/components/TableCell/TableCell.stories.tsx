import type { Meta, StoryObj } from '@storybook/react';
import { TableCell } from './TableCell';

const meta = {
  title: 'Library/Tables/TableCell',
  component: TableCell,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table><tbody><tr><Story /></tr></tbody></table>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    disabled: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    backgroundColor: '#ffffff',
    textColor: '#111827',
    disabled: false,
  },
  render: (args) => (
    <TableCell {...args}>{'React'}</TableCell>
  ),
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
