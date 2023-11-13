import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DevTool } from './component/devTool';
import { Main } from './page/main';
import { Preview } from './page/preview';
import { appStore } from './store';
import './styles.css';

export const App = () => {
  return (
    <BrowserRouter>
      <NextUIProvider className='h-full'>
        <Provider store={appStore}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/preview' element={<Preview />} />
          </Routes>
        </Provider>
        <DevTool />
      </NextUIProvider>
    </BrowserRouter>
  );
};
