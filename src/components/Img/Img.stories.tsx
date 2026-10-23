import type { Meta, StoryObj } from '@storybook/react';
import { Img } from './Img';

const meta = {
  title: 'Library/Img',
  component: Img,
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
    title: 'Garden landscape',
    description: 'A responsive image component.',
    backgroundColor: '#eff6ff',
    textColor: '#111827',
    disabled: false,
  },
} satisfies Meta<typeof Img>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
