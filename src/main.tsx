import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { DevTools } from 'jotai-devtools'
import { Provider } from 'jotai'
import { appStore } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider className="h-full">
    <Provider store={appStore}>
      <App />
    </Provider>
    <DevTools store={appStore} />
  </NextUIProvider>
);
