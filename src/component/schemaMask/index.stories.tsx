import { StoryObj, type Meta } from '@storybook/react';
import { SchemaMask } from '.';

const meta = {
  title: '内置组件/SchemaMask',
  component: SchemaMask,
  tags: ['autodocs'],
} satisfies Meta<typeof SchemaMask>;

export default meta;
type Story = StoryObj<Meta<typeof SchemaMask>>;

export const Primary: Story = {
  args: {
    id: 'hello',
  },
  render(props) {
    return (
      <div>
        <div id='hello'>hello schema mask</div>
        <SchemaMask id={props.id} />
      </div>
    );
  },
};
