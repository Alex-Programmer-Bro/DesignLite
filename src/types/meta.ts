import * as CSS from 'csstype';

export type CSSInterface = Partial<Record<keyof CSS.Properties, string>>;

export type TextAlign = Pick<CSS.Properties, 'textAlign'>['textAlign'];
