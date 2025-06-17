import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window.localStorage === 'undefined') {
        console.warn('localStorage не поддерживается');
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Получение данных из localStorage:', error);
      return initialValue;
    }
  });

  const handleStorageChange = useCallback((event: StorageEvent) => {
    if (event.key === key) {
      if (event.newValue) {
        setValue(JSON.parse(event.newValue));
      }
    }
  }, [key, value]);

  useEffect(() => {
    try {
        if (typeof window.localStorage === 'undefined') {
          console.warn('localStorage не поддерживается');
          return;
        }

        const item = JSON.stringify(value);
        window.localStorage.setItem(key, item);
    } catch (e) {
      console.error('Запись в localStorage', (e as Error).message);
    }

    return () => window.localStorage.removeItem(key);
  }, [key]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [value, setValue];
};

export default useLocalStorage;
