import { expect, test } from 'vitest';
import { resolveLock, resolveUnit, resolveValue } from './helper';

test('resolveLock', () => {
  expect(resolveLock('')).toBeTruthy();
  expect(resolveLock('1px 1px 1px 1px')).toBeTruthy();
  expect(resolveLock('1px 2px 1px 1px')).toBeFalsy();
  expect(resolveLock('auto')).toBeTruthy();
});

test('resolveUnit', () => {
  expect(resolveUnit('1px')).toEqual('px');
  expect(resolveUnit('1px 1px 1px 1px')).toEqual('px');
  expect(resolveUnit('1%')).toEqual('%');
  expect(resolveUnit('auto')).toEqual('auto');
  expect(resolveUnit('auto auto')).toEqual('auto');
  expect(() => resolveUnit('invalid')).toThrowErrorMatchingInlineSnapshot('"unknow unit of invalid"');
});

test('resolveValue', () => {
  expect(resolveValue('1px')).toEqual('1');
  expect(resolveValue('10px 20px')).toEqual(['10px', '20px', '10px', '20px']);
  expect(resolveValue('1%')).toEqual('1');
  expect(resolveValue('auto')).toEqual('');
  expect(resolveValue('10px 10px 10px 10px')).toEqual(['10px', '10px', '10px', '10px']);
});
