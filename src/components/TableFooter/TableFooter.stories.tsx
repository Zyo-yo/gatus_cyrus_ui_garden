import type { Meta, StoryObj } from '@storybook/react';
import { TableFooter } from './TableFooter';

const meta = {
  title: 'Library/Tables/TableFooter',
  component: TableFooter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table><Story /></table>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    disabled: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    backgroundColor: '#eff6ff',
    textColor: '#111827',
    disabled: false,
  },
  render: (args) => (
    <TableFooter {...args}><tr><td colSpan={2}>1 course</td></tr></TableFooter>
  ),
} satisfies Meta<typeof TableFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
