import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { DevTools } from 'jotai-devtools'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider className="h-full">
    <App />
    <DevTools />
  </NextUIProvider>
);
