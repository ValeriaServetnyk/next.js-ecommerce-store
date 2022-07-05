import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';

test('set, get and delete cookies', () => {
  const cookie = {
    key: 'cart',
    value: [{ id: '1', quantity: 1 }],
  };
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
