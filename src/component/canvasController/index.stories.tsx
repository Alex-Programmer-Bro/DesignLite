import { StoryObj, type Meta } from '@storybook/react';
import { CanvasController } from '.';

const meta = {
  title: '内置组件/CanvasController',
  component: CanvasController,
  tags: ['autodocs'],
} satisfies Meta<typeof CanvasController>;

export default meta;
type Story = StoryObj<Meta<typeof CanvasController>>;

export const Primary: Story = {
  args: {
    children: <div style={{ width: 400, height: 300, background: 'blue' }}></div>,
  },
};
