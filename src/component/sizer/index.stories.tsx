import { StoryObj, type Meta } from "@storybook/react";
import { Sizer } from ".";

const meta = {
  title: "内置组件/Sizer",
  component: Sizer,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['simple', 'complicated']
    },
  }
} satisfies Meta<typeof Sizer>;

export default meta;
type Story = StoryObj<Meta<typeof Sizer>>;

export const Simple: Story = {
  args: {
    label: 'width',
    mode: 'simple',
  }
}

export const Complicated: Story = {
  args: {
    label: 'margin',
    mode: 'complicated',
  }
}
