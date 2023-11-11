import { FC } from 'react';

interface UnitSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * 单位选择器
 */
export const UnitSelector: FC<UnitSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      role='unit-selector'
      className='outline-none bg-transparent'
      defaultValue={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value='px'>px</option>
      <option value='%'>%</option>
      <option value='auto'>auto</option>
    </select>
  );
};
