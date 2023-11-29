import { test } from 'vitest';
import { release, upgrade } from '.';

test('release', async () => {
  await release();
});

test('upgrade', () => {
  expect(upgrade('0.0.4-alpha')).toEqual('0.0.5-alpha');
});
