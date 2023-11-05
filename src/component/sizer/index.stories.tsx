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
  decorators: [
    (story) => {
      const [value, setValue] = useState<Value>('10px');
      return story({
        args: {
          label: 'width',
          mode: 'simple',
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
  decorators: [
    (story) => {
      const [value, setValue] = useState<Value>('12%');
      return story({
        args: {
          label: 'width',
          mode: 'simple',
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}

export const DisabledSimple: Story = {
  decorators: [
    (story) => {
      const [value, setValue] = useState<Value>('auto');
      return story({
        args: {
          label: 'width',
          mode: 'simple',
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}

export const ComplicatedMode: Story = {
  decorators: [
    (story) => {
      const [value, setValue] = useState<Value>(10);
      return story({
        args: {
          label: 'margin',
          mode: 'complicated',
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}

export const ComplicatedValue: Story = {
  decorators: [
    (story) => {
      const [value, setValue] = useState<Value>('10px 20px');
      return story({
        args: {
          label: 'margin',
          mode: 'complicated',
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
}
