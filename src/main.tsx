import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Preview } from "./preview";
import { appStore } from "./store";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <NextUIProvider className="h-full">
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Provider>
      <DevTools store={appStore} />
    </NextUIProvider>
  </BrowserRouter>
);
