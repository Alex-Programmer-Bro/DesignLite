import { StoryObj, type Meta } from "@storybook/react";
import { BlockRender } from ".";

const meta = {
  title: "内置组件/BlockRender",
  component: BlockRender,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BlockRender>;

export default meta;
type Story = StoryObj<Meta<typeof BlockRender>>;

export const Primary: Story = {
  args: {
    text: 'hello world',
  }
}
