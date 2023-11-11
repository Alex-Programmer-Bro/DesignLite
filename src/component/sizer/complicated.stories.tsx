import { expect } from '@storybook/jest';
import { useState } from '@storybook/preview-api';
import { StoryObj, type Meta } from '@storybook/react';
import { ComplicatedSizer } from './complicated';
import { Value } from './type';

const meta = {
  title: '内置组件/Complicated-Sizer',
  component: ComplicatedSizer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComplicatedSizer>;

export default meta;
type Story = StoryObj<Meta<typeof ComplicatedSizer>>;

export const Primary: Story = {
  args: {
    label: 'margin',
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
  play: async ({ canvasElement, step }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const switchTarget = canvasElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    await step('default ui', () => {
      const inputs = canvasElement.querySelectorAll('input');
      expect(inputs.length).toEqual(2);
      const singleInput = canvasElement.querySelector('input[type="number"]') as HTMLInputElement;
      expect(singleInput.value).toEqual('10');
    });

    await step('switch status', () => {
      expect(switchTarget.checked).toBeTruthy();
      switchTarget.click();
    });

    await step('keep a same value while first toggle', () => {
      const switchedInputs = canvasElement.querySelectorAll('input[type="number"]');
      expect(switchedInputs.length).toEqual(4);
      expect(switchTarget.checked).toBeFalsy();
      const values = ([...switchedInputs] as HTMLInputElement[]).map((item) => item.value);
      expect(values).toEqual(['10', '10', '10', '10']);
    });
  },
};

export const ComplicatedValue: Story = {
  args: {
    label: 'margin',
    value: '10px 20px',
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
