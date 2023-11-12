import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Preview } from './page/preview';
import { appStore } from './store';
import './styles.css';
import { Main } from './page/main';

export const App = () => (
  <BrowserRouter>
    <NextUIProvider className='h-full'>
      <Provider store={appStore}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/preview' element={<Preview />} />
        </Routes>
      </Provider>
      <DevTools store={appStore} />
    </NextUIProvider>
  </BrowserRouter>
);
