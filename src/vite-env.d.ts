/// <reference types="vite/client" />

declare const isWeb: boolean;

interface Window {
  isWeb: boolean;
  __TAURI__: Object;
}
