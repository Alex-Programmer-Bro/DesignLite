import { expect, test } from 'vitest'
import { resolveLock } from './helper'


test('resolveLock', () => {
  expect(resolveLock(1)).toBeTruthy();
  expect(resolveLock('1px 1px 1px 1px')).toBeTruthy();
  expect(resolveLock('1px 2px 1px 1px')).toBeFalsy();
  expect(resolveLock('auto')).toBeTruthy();
});
