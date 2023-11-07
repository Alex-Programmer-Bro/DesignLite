import { StoryObj, type Meta } from "@storybook/react";
import { TextEditor } from ".";
import { useState } from '@storybook/preview-api';

const meta = {
  title: "内置组件/TextEditor",
  component: TextEditor,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<Meta<typeof TextEditor>>;

export const Primary: Story = {
  args: {
    state: {
      content: 'hello world',
      size: '12px',
      color: '#000000'
    }
  },
  decorators: [
    (story, config) => {
      const [state, setValue] = useState(config.args.state);
      return story({
        args: {
          state,
          onChange: setValue
        },
      });
    },
  ],
}
