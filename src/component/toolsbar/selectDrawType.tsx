import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';
import { createSchemaAtom } from '../../store/schema';
import { selectedDrawTypeAtom } from '../../store/toolbar';
import { SchemaType } from '../../types/schema';

export const ChevronDownIcon = () => (
  <svg fill='none' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z'
      fill='currentColor'
    />
  </svg>
);

const descriptionsMap = {
  [SchemaType.Block]: '插入文本或者图形色块儿',
  [SchemaType.Image]: '插入一张图片',
};

export const SelectDrawType = () => {
  const createSchema = useSetAtom(createSchemaAtom);
  const [selectedDrawType, setSelectedDrawType] = useAtom(selectedDrawTypeAtom);

  const onSelectionChange = (keys: Selection) => {
    setSelectedDrawType(Array.from(keys)[0] as SchemaType);
  };

  return (
    <ButtonGroup variant='shadow' color='secondary' size='sm' className='w-full'>
      <Button onClick={createSchema} isIconOnly>
        <img
          src={selectedDrawType === SchemaType.Block ? '/icon/shape.svg' : '/icon/photo.svg'}
          alt=''
          height={24}
          width={24}
        />
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label='Select Draw Type'
          selectedKeys={new Set([selectedDrawType])}
          selectionMode='single'
          onSelectionChange={onSelectionChange}
          className='max-w-[300px]'
        >
          {Object.entries(SchemaType).map(([, key]) => {
            return (
              <DropdownItem key={key} description={descriptionsMap[key]}>
                {key}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
