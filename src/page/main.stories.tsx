import { expect } from '@storybook/jest';
import { StoryObj, type Meta } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Main } from './main';

const meta = {
  title: '主程序/Main',
  component: Main,
  tags: ['autodocs'],
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<Meta<typeof Main>>;

export const Primary: Story = {
  async play({ canvasElement, step }) {
    await step('render template', () => {
      const canvas = within(canvasElement);
      const resetBtn = canvas.getByText('重置');
      expect(resetBtn).toBeInTheDocument();
      resetBtn.click();

      const templateBtn = canvas.getByText('使用模版');
      expect(templateBtn).toBeInTheDocument();
      templateBtn.click();
    });
  },
};
