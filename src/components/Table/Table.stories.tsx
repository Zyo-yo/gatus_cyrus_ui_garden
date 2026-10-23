import { TableHeader } from '../TableHeader/Index';
import { TableRow } from '../TableRow/Index';
import { TableCell } from '../TableCell/Index';
import { TableFooter } from '../TableFooter/Index';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Library/Tables/Table',
  component: Table,
  tags: ['autodocs'],
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
    <Table {...args}><><thead><tr><th scope="col">Course</th><th scope="col">Status</th></tr></thead><tbody><tr><td>React</td><td>Complete</td></tr></tbody><tfoot><tr><td colSpan={2}>1 course</td></tr></tfoot></></Table>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};

export const Composed: Story = {
  render: (args) => (
    <Table {...args}>
      <caption>Course progress</caption>
      <TableHeader>
        <TableRow>
          <th scope="col">Course</th>
          <th scope="col">Status</th>
        </TableRow>
      </TableHeader>
      <tbody>
        <TableRow>
          <TableCell>React</TableCell>
          <TableCell>Complete</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Storybook</TableCell>
          <TableCell>In progress</TableCell>
        </TableRow>
      </tbody>
      <TableFooter>
        <TableRow>
          <TableCell>2 courses</TableCell>
          <TableCell>1 complete</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
