import { getAddress, getCatchphrase } from '../src/ip-catchphrase';
import 'jest-chain';

test('Valid IP and port', () => {
  expect(getCatchphrase('192.168.0.1', 25565)).toBe('runner rally day significance');
});

test('Valid IP only', () => {
  expect(getCatchphrase('192.168.0.1')).toBe('runner rally still');
});

test('IP too short', () => {
  expect(getCatchphrase('123.234.1')).toBe(null);
});

test('IP too long', () => {
  expect(getCatchphrase('123.234.1.23.1')).toBe(null);
});

test('IP out of range', () => {
  expect(getCatchphrase('256.1.1.1')).toBe(null);
});

test('Negative port', () => {
  expect(getCatchphrase('192.168.0.1', -1)).toBe(null);
});

test('Port out of range', () => {
  expect(getCatchphrase('192.168.0.1', 65536)).toBe(null);
});

test('Address undefined', () => {
  expect(getCatchphrase(undefined, 25565)).toBe(null);
});

test('Address null', () => {
  expect(getCatchphrase(null, 25565)).toBe(null);
});

test('Address empty', () => {
  expect(getCatchphrase('', 25565)).toBe(null);
});

test('Port undefined', () => {
  expect(getCatchphrase('192.168.0.1', undefined)).toBe('runner rally still');
});

test('Port null', () => {
  expect(getCatchphrase('192.168.0.1', null)).toBe('runner rally still');
});

test('valid 3-word catchphrase', () => {
  expect(getAddress('runner rally still')).toEqual({
    address: '192.168.0.1',
    typos: [],
  });
});

test('valid 4-word catchphrase', () => {
  expect(getAddress('runner rally day significance')).toEqual({
    address: '192.168.0.1',
    port: 25565,
    typos: [],
  });
});

test('valid 3-word catchphrase with typos', () => {
  expect(getAddress('runner rally still'))
    .toHaveProperty('address', '192.168.0.1')
    .not.toHaveProperty('port');
});

test('valid 4-word catchphrase with typos', () => {
  expect(getAddress('runne rrally day significence'))
    .toHaveProperty('address', '192.168.0.1')
    .toHaveProperty('port', 25565);
});

test('Catchphrase too short', () => {
  expect(getAddress('runner rally'))
    .toBe(null);
});

test('Catchphrase too long', () => {
  expect(getAddress('runner rally day significance ore'))
    .toBe(null);
});

test('Catchphrase undefined', () => {
  expect(getAddress(undefined))
    .toBe(null);
});

test('Catchphrase null', () => {
  expect(getAddress(null))
    .toBe(null);
});

test('Catchphrase empty', () => {
  expect(getAddress(''))
    .toBe(null);
});
