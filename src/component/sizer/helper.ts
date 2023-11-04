import { Value } from "./type";

export const resolveLock = (value: Value) => {
  if (typeof value === 'number') {
    return true;
  } else {
    if (/\d/.test(value)) {
      const values = value.split(' ');
      if (!values.length) return true;
      return values.every(item => item === values[0]);
    } else {
      return true;
    }
  }
}
