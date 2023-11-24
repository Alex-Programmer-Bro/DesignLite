import { Accordion, AccordionItem, Card } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { drawingSchemaIdAtom } from '../store/schema';
import { Layout } from './Layout';
import { Meta } from './Meta';

export const Designer = () => {
  const selectedSchemaId = useAtomValue(drawingSchemaIdAtom);

  return (
    <div className='fixed top-0 right-0 m-4' key={selectedSchemaId} onWheel={(e) => e.stopPropagation()}>
      <Card className='overflow-auto p-4 w-[400px]' style={{ maxHeight: 'calc(100vh - 32px)' }}>
        <Accordion selectionMode='multiple' defaultExpandedKeys={['layout']}>
          <AccordionItem key='layout' aria-label='Layout' title='Layout'>
            <Layout></Layout>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem key='meta' aria-label='Meta' title='Meta'>
            <Meta></Meta>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};
