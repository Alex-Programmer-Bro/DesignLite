import { StoryObj, type Meta } from "@storybook/react";
import { TextEditor } from ".";

const meta = {
  title: "内置组件/TextEditor",
  component: TextEditor,
  tags: ['autodocs']
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<Meta<typeof TextEditor>>;

export const Primary: Story = {}
