export type Value = number | string;

export interface SizerProps {
  label: string;
  mode: 'simple' | 'complicated';
  value: Value;
  onChange: (value: Value) => void;
}
