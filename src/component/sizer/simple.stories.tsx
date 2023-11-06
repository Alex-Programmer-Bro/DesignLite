import { StoryObj, type Meta } from "@storybook/react";
import { SimpleSizer } from "./simple";
import { useState } from '@storybook/preview-api';
import { Value } from "./type";
import { userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest'

const meta = {
  title: "内置组件/Simple-Sizer",
  component: SimpleSizer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SimpleSizer>;

export default meta;
type Story = StoryObj<Meta<typeof SimpleSizer>>;

export const Primary: Story = {
  args: {
    label: 'width',
    value: '10px'
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
  play: async ({ canvasElement, step }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const unitSelector = canvasElement.querySelector('select')!;

    await step('Simple ui', async () => {
      const inputs = canvasElement.querySelectorAll('input');
      expect(inputs.length).toEqual(1);
      expect(inputs[0].value).toEqual('10');
      expect(inputs[0].disabled).toBeFalsy();
    })

    await step('Select auto unit', async () => {
      await userEvent.selectOptions(unitSelector, 'auto');
      const inputs = canvasElement.querySelectorAll('input');
      expect(inputs[0].value).toEqual('');
      expect(inputs[0].disabled).toBeTruthy();
      await userEvent.selectOptions(unitSelector, 'px');
      expect(inputs[0].value).toEqual('10');
    })
  },
};

export const PercentUnit: Story = {
  args: {
    label: 'width',
    value: '12%'
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

export const DisabledSimple: Story = {
  args: {
    label: 'width',
    value: 'auto'
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
