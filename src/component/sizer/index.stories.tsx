import { StoryObj, type Meta } from "@storybook/react";
import { Sizer } from ".";
import { useState } from '@storybook/preview-api';
import { Value } from "./type";
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest'

const meta = {
  title: "内置组件/Sizer",
  component: Sizer,
  tags: ["autodocs"],
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

export const SimpleMode: Story = {
  args: {
    label: 'width',
    mode: 'simple',
    value: 10
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
    const canvas = within(canvasElement);
    const unitSelector = canvas.getByRole('unit-selector');

    await step('Simple ui', () => {
      const inputs = canvasElement.querySelectorAll('input');
      expect(inputs.length).toEqual(1);
      expect(inputs[0].value).toEqual('10');
      expect(inputs[0].disabled).toBeFalsy();
      const options = canvas.getAllByRole('option') as HTMLOptionElement[];
      expect(options.map(item => item.value)).toEqual(['px', '%', 'auto']);
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
    mode: 'simple',
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
    mode: 'simple',
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

export const ComplicatedMode: Story = {
  args: {
    label: 'margin',
    mode: 'complicated',
    value: 10
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
    mode: 'complicated',
    value: '10px 20px'
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
