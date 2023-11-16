import { Value } from './type';

export const resolveLock = (value: Value) => {
  if (/\d/.test(value)) {
    const values = value.split(' ');
    return values.every((item) => item === values[0]);
  } else {
    return true;
  }
};

export const resolveUnit = (value: Value): UnitType => {
  if (typeof value === 'number' || value.indexOf('px') !== -1) {
    return 'px';
  } else if (value.indexOf('auto') !== -1) {
    return 'auto';
  } else if (value.indexOf('%') !== -1) {
    return '%';
  } else {
    throw new Error(`unknow unit of ${value}`);
  }
};

export const resolveValue = (value: Value) => {
  if (value === 'auto') {
    return '';
  } else {
    const v = value.toString();
    if (/\s/.test(v)) {
      const resolved = v.split(' ');
      if (resolved.length === 4) return v;
      return [resolved[0], resolved[1], resolved[0], resolved[1]];
    } else {
      return parseFloat(value.toString()).toString();
    }
  }
};

export const isComplicatedValue = (value: Value) => {
  return /[\s,]/.test(value.toString());
};
