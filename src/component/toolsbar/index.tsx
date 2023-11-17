import { Button, Card, CardBody, Code, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import hotkeys from 'hotkeys-js';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { useDebug } from '../../hook/useDebug';
import { resetStyleAtom } from '../../store/designer';
import { deleteSchameAtom, exportAssetsAtom, importConfigAtom, resetAtom, useTemplateAtom } from '../../store/schema';
import { allowSelectAtom } from '../../store/toolbar';
import { SelectDrawType } from './selectDrawType';

export const Toolsbar: React.FC = () => {
  const resetSchema = useSetAtom(resetAtom);
  const useTemplate = useSetAtom(useTemplateAtom);
  const exportAssets = useSetAtom(exportAssetsAtom);
  const importConfig = useSetAtom(importConfigAtom);
  const deleteSchema = useSetAtom(deleteSchameAtom);
  const [allowSelect, setAllowSelect] = useAtom(allowSelectAtom);
  const debug = useDebug();
  const resetStyle = useSetAtom(resetStyleAtom);

  const onPreview = async () => {
    if (isWeb) {
      window.open('/preview', 'blank');
    } else {
      const { invoke } = await import('@tauri-apps/api/tauri');
      const preview = new URL('/preview', location.origin);
      await invoke('preview', { url: preview.toString() });
    }
  };

  hotkeys('Backspace', function (event, _) {
    event.preventDefault();
    if (!allowSelect) return;
    deleteSchema();
    resetStyle();
  });

  const SelectOptions = [
    {
      label: '实时预览',
      describe: '提前预览绘制效果',
      icon: '/icon/preview.svg',
      onClick: onPreview,
    },
    {
      label: '导出资源',
      describe: '导出前端静态资源，以供部署上线',
      icon: '/icon/export.svg',
      onClick: exportAssets,
    },
    {
      label: '导入配置',
      describe: (
        <>
          导入 <Code size='sm'>designeLite.json</Code> 配置文件，继续绘制
        </>
      ),
      icon: '/icon/import.svg',
      onClick: importConfig,
    },
    {
      label: '删除',
      describe: '删除选中的元素',
      icon: '/icon/delete.svg',
      onClick: deleteSchema,
    },
    {
      label: '使用模版',
      describe: '代码内预制的模版',
      icon: '/icon/template.svg',
      onClick: useTemplate,
    },
    {
      label: '重置',
      describe: '清空所有状态数据',
      icon: '/icon/reset.svg',
      onClick: resetSchema,
    },
    {
      label: debug ? '关闭调试' : '启动调试模式',
      describe: debug ? '返回程序正常使用状态' : '查看程序各个状态数据，便于问题排查',
      icon: debug ? '/icon/close-debug.svg' : '/icon/debug.svg',
      onClick: () => {
        const url = new URL(location.href);
        if (debug) {
          url.searchParams.delete('debug');
        } else {
          url.searchParams.set('debug', 'debug');
        }
        location.href = url.toString();
      },
    },
  ];

  return (
    <Card className='fixed z-10 left-1/2 top-4 -translate-x-1/2'>
      <CardBody className='grid grid-cols-3 gap-2'>
        <Dropdown placement='bottom-start'>
          <DropdownTrigger>
            <Button size='sm' color='primary'>
              <img src='/icon/hamburger.svg' alt='' height={24} width={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='ACME features'>
            {SelectOptions.map((item) => {
              return (
                <DropdownItem
                  key={item.label}
                  description={item.describe}
                  onClick={item.onClick}
                  startContent={<img className='w-4' src={item.icon} />}
                >
                  {item.label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <SelectDrawType />
        <Button size='sm' variant={allowSelect ? 'solid' : 'light'} onClick={() => setAllowSelect((pre) => !pre)}>
          <img src='/icon/select.svg' alt='' />
        </Button>
      </CardBody>
    </Card>
  );
};
