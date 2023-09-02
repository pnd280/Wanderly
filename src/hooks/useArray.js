import {
  useCallback,
  useDebugValue,
  useState,
} from 'react';

const useArray = (initialValue, debugValue = '') => {
  const [array, setArray] = useState(initialValue);

  const push = useCallback((element) => {
    setArray((a) => [...a, element]);
  }, []);

  const filter = useCallback((callback) => {
    setArray((a) => a.filter(callback));
  }, []);

  const update = useCallback((index, newElement) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }, []);

  const remove = useCallback((index) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  useDebugValue(`${debugValue} (${array.length})`);

  return { array, setArray, push, filter, update, remove, clear };
};

export default useArray;
