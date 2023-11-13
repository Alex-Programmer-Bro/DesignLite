import { StoryObj, type Meta } from '@storybook/react';
import { UnitSelector } from './unit';

const meta = {
  title: '内置组件/UnitSelectorr',
  component: UnitSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UnitSelector>;

export default meta;
type Story = StoryObj<Meta<typeof UnitSelector>>;

export const Primary: Story = {
  args: {
    value: 'px',
  },
};
