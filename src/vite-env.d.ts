/// <reference types="vite/client" />

declare const isWeb: boolean;

interface Window {
  isWeb: boolean;
  __TAURI__: Object;
}

declare type UnitType = 'px' | '%' | 'auto';
