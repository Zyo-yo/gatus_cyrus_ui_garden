import type { Meta, StoryObj } from '@storybook/react';
import { HeroImage } from './HeroImage';

const meta = {
  title: 'Library/HeroImage',
  component: HeroImage,
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
    title: 'Build something beautiful',
    description: 'Explore our responsive component library.',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    disabled: false,
  },
} satisfies Meta<typeof HeroImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true },
};
