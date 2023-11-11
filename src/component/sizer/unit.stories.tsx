import { StoryObj, type Meta } from '@storybook/react';
import { UnitSelector } from './unit';
import { useState } from '@storybook/preview-api';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: '内置组件/UnitSelectorr',
  component: UnitSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UnitSelector>;

export default meta;
type Story = StoryObj<Meta<typeof UnitSelector>>;

export const Primary: Story = {
  args: {
    value: 'px',
  },
  decorators: [
    (story, config) => {
      const [value, setValue] = useState(config.args.value);
      return story({
        args: {
          value: value,
          onChange: setValue,
        },
      });
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const options = canvas.getAllByRole('option') as HTMLOptionElement[];
    expect(options.map((item) => item.value)).toEqual(['px', '%', 'auto']);

    const unitSelector = canvas.getByRole('unit-selector') as HTMLSelectElement;

    expect(unitSelector.value).toEqual('px');

    await userEvent.selectOptions(unitSelector, '%');
    expect(unitSelector.value).toEqual('%');

    await userEvent.selectOptions(unitSelector, 'auto');
    expect(unitSelector.value).toEqual('auto');

    await userEvent.selectOptions(unitSelector, 'px');
    expect(unitSelector.value).toEqual('px');
  },
};
