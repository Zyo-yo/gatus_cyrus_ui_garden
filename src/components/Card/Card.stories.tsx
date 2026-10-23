import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Library/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    disabled: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    src: '/images/garden.svg',
    alt: 'Green hills beneath a blue sky and golden sun',
    title: 'Explore the garden',
    description: 'Reusable components for your next React project.',
    backgroundColor: '#ffffff',
    textColor: '#111827',
    disabled: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
