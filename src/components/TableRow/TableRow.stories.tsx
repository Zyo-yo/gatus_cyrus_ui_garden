import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from './TableRow';

const meta = {
  title: 'Library/Tables/TableRow',
  component: TableRow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table><tbody><Story /></tbody></table>
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
    <TableRow {...args}><><td>React</td><td>Complete</td></></TableRow>
  ),
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
