export type Value = string;

export interface SizerProps {
  label: string;
  mode: 'simple' | 'complicated';
  value: Value;
  onChange: (value: Value) => void;
  onFocus?: (e: React.FocusEvent<Element, Element>) => void;
  key?:string
}
