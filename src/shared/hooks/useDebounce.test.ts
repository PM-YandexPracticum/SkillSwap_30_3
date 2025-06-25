import { renderHook, act } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import useDebounce from './useDebounce';

describe('Тесты хука useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('Начальное состояние useDebounce - пустая строка', () => {
    const { result } = renderHook(() => useDebounce('Английский', 500));
    expect(result.current).toBe('');
  });

  test('Значение в useDebounce устанавливается с задержкой', () => {
    const { result } = renderHook(() => useDebounce('Английский', 500));

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Английский');
  });

  test('delay = 0 (должно обновляться сразу)', () => {
    const { result } = renderHook(() => useDebounce('Английский', 0));
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe('Английский');
  });

  test('useDebounce с отрицательной задержкой работает как без задержки', () => {
    const { result } = renderHook(() => useDebounce('Английский', -200));

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe('Английский');
  });

  test('В useDebounce работает clearTimeout', () => {
    const hook = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'Английский', delay: 500 },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    hook.rerender({ value: 'Испанский', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(hook.result.current).not.toBe('Английский');
    expect(hook.result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(hook.result.current).toBe('Испанский');
    expect(hook.result.current).not.toBe('Английский');
  });

  test('Обновляет значение только после последнего изменения при быстрой смене value', () => {
    const hook = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 200 },
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });
    hook.rerender({ value: 'ab', delay: 200 });

    act(() => {
      jest.advanceTimersByTime(100);
    });
    hook.rerender({ value: 'abc', delay: 200 });

    expect(hook.result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(hook.result.current).toBe('abc');
  });

  test('Изменение только delay без изменения value', () => {
    const hook = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'Английский', delay: 300 },
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    hook.rerender({ value: 'Английский', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(hook.result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(hook.result.current).toBe('Английский');
  });
});
