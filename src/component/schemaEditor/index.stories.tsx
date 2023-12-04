import { StoryObj, type Meta } from '@storybook/react';
import { SchemaEditor } from '.';

const meta = {
  title: '内置组件/SchemaEditor',
  component: SchemaEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof SchemaEditor>;

export default meta;
type Story = StoryObj<Meta<typeof SchemaEditor>>;

export const Primary: Story = {};
