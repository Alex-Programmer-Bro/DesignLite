import { StoryObj, type Meta } from "@storybook/react";
import { TextRender } from ".";

const meta = {
  title: "内置组件/TextEditor",
  component: TextRender,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextRender>;

export default meta;
type Story = StoryObj<Meta<typeof TextRender>>;

export const Primary: Story = {
  args: {
    text: 'hello world',
    onChange: text => {
      console.log(text);
    }
  }
}
