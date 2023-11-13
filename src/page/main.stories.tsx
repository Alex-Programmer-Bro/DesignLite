import { StoryObj, type Meta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Main } from './main';

const meta = {
  title: '主程序/Main',
  component: Main,
  tags: ['autodocs'],
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<Meta<typeof Main>>;

export const Primary: Story = {
  decorators: [withRouter],
};
