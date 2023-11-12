import { StoryObj, type Meta } from '@storybook/react';
import { Main } from './main';

const meta = {
  title: '主程序/Main',
  component: Main,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<Meta<typeof Main>>;

export const Primary: Story = {};
