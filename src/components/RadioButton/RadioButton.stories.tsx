import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Library/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    label: 'Standard delivery',
    name: 'delivery',
    value: 'standard',
    backgroundColor: '#eff6ff',
    textColor: '#111827',
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: (args) => (
    <div role="radiogroup" aria-label="Delivery method">
      <RadioButton {...args} label="Standard delivery" value="standard" />
      <RadioButton {...args} label="Express delivery" value="express" />
    </div>
  ),
};
