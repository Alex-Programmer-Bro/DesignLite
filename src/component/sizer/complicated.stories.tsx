import { StoryObj, type Meta } from "@storybook/react";
import { ComplicatedSizer } from "./complicated";
import { useState } from '@storybook/preview-api';
import { Value } from "./type";

const meta = {
  title: "内置组件/Complicated-Sizer",
  component: ComplicatedSizer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ComplicatedSizer>;

export default meta;
type Story = StoryObj<Meta<typeof ComplicatedSizer>>;

export const Primary: Story = {
  args: {
    label: 'margin',
    value: '10px'
  },
  decorators: [
    (story, config) => {
      const [value, setValue] = useState<Value>(config.args.value);
      return story({
        args: {
          ...config.args,
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}

export const ComplicatedValue: Story = {
  args: {
    label: 'margin',
    value: '10px 20px'
  },
  decorators: [
    (story, config) => {
      const [value, setValue] = useState<Value>(config.args.value);
      console.log(value);
      return story({
        args: {
          ...config.args,
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}
