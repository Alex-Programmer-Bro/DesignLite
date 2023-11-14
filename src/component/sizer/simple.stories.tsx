import { useState } from '@storybook/preview-api';
import { StoryObj, type Meta } from '@storybook/react';
import { SimpleSizer } from './simple';
import { Value } from './type';

const meta = {
  title: '内置组件/Simple-Sizer',
  component: SimpleSizer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SimpleSizer>;

export default meta;
type Story = StoryObj<Meta<typeof SimpleSizer>>;

export const Primary: Story = {
  args: {
    label: 'width',
    value: '10px',
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
};

export const PercentUnit: Story = {
  args: {
    label: 'width',
    value: '12%',
  },
};

export const DisabledSimple: Story = {
  args: {
    label: 'width',
    value: 'auto',
  },
};
