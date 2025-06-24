import { renderHook, act } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import useLocalStorage from './useLocalStorage';

describe('Тесты хука useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('useLocalStorage использует initialValue, если в localStorage пусто', () => {
    const { result } = renderHook(() =>
      useLocalStorage('new-key', 'new-value')
    );
    expect(result.current[0]).toBe('new-value');
  });

  test('useLocalStorage использует значение из localStorage, если оно есть', () => {
    localStorage.setItem('old-key', JSON.stringify('old-value'));
    const { result } = renderHook(() =>
      useLocalStorage('old-key', 'new-value')
    );
    expect(result.current[0]).toBe('old-value');
  });

  test('записывает initialValue в localStorage, если ключа нет', () => {
    renderHook(() => useLocalStorage('new-key', 'initialValue'));

    expect(localStorage.getItem('new-key')).toBe(
      JSON.stringify('initialValue')
    );
  });

  test('setValue обновляет состояние и localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('old-key', 'old-value')
    );
    const [, setValue] = result.current;

    act(() => {
      setValue('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('old-key')).toBe(JSON.stringify('new-value'));
  });

  test('useLocalStorage обновляет значение при событии storage в другой вкладке', () => {
    const { result } = renderHook(() => useLocalStorage('shared-key', 'init'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'shared-key',
          newValue: JSON.stringify('updated-from-other-tab'),
        })
      );
    });

    expect(result.current[0]).toBe('updated-from-other-tab');
  });

  test('Игнорирует событие storage с другим ключом', () => {
    const { result } = renderHook(() =>
      useLocalStorage('old-key', 'old-value')
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'new-key',
          newValue: JSON.stringify('new-value'),
        })
      );
    });

    expect(result.current[0]).toBe('old-value');
    expect(localStorage.getItem('old-key')).toBe(JSON.stringify('old-value'));
  });

  test('Событие storage с newValue = null возвращает старое значение, не меняя его', () => {
    const { result } = renderHook(() =>
      useLocalStorage('old-key', 'old-value')
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'old-key',
          newValue: null,
        })
      );
    });

    expect(result.current[0]).toBe('old-value');
    expect(localStorage.getItem('old-key')).toBe(JSON.stringify('old-value'));
  });

  test('Если в localStorage невалидный JSON, useLocalStorage вернет initialValue', () => {
    localStorage.setItem('key', 'invalid');
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  test('Если initialValue = undefined - должно получиться undefined', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key-undefined', undefined)
    );
    expect(result.current[0]).toBeUndefined();
    expect(localStorage.getItem('key-undefined')).toBe('undefined');
  });

  test('Если initialValue = null - должно получиться null', () => {
    const { result } = renderHook(() => useLocalStorage('key-null', null));
    expect(result.current[0]).toBeNull();
    expect(localStorage.getItem('key-null')).toBe('null');
  });

  test('Если initialValue = NaN - должно получиться null', () => {
    const { result } = renderHook(() => useLocalStorage('key-nan', NaN));
    expect(result.current[0]).toBeNaN();
    expect(localStorage.getItem('key-nan')).toBe('null');
  });

  test('При смене key хук берет значение initialValue', () => {
    const initialValue = 'default-value';
    const hook = renderHook(({ key }) => useLocalStorage(key, initialValue), {
      initialProps: { key: 'key1' },
    });

    expect(hook.result.current[0]).toBe(initialValue);

    hook.rerender({ key: 'key2' });

    expect(hook.result.current[0]).toBe(initialValue);
  });

  test('При смене initialValue после первого рендера - значение не обновляется', () => {
    const key = 'key-init';
    const initialValue = 'default-value';

    const hook = renderHook(({ initial }) => useLocalStorage(key, initial), {
      initialProps: { initial: initialValue },
    });

    expect(hook.result.current[0]).toBe(initialValue);

    hook.rerender({ initial: 'new-value' });

    expect(hook.result.current[0]).toBe(initialValue);
  });
});
