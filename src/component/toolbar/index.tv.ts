import { tv } from 'tailwind-variants'

export const styles = tv({
  slots: {
    container: 'flex py-2 pr-2 border-b-1 border-solid border-[#ddd]',
    item: 'text-[12px] p-2 border-1 border-solid  ml-2 cursor-pointer'
  },
  variants: {
    selected: {
      true: {
        item: 'border-red-500'
      },
      false: {
        item: 'border-[#ddd]'
      }
    }
  }
})
