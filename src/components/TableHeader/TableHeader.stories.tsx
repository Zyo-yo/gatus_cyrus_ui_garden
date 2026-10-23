import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from './TableHeader';

const meta = {
  title: 'Library/Tables/TableHeader',
  component: TableHeader,
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
    <TableHeader {...args}><tr><th scope="col">Course</th><th scope="col">Status</th></tr></TableHeader>
  ),
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
