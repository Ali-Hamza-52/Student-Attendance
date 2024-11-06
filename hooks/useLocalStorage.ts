type LocalStorageType = 'get' | 'set' | 'remove';

const useLocalStorage = () => {
  const getItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const setItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  const removeItem = (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  const clearAll = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    clearAll,
  };
};

export default useLocalStorage;
