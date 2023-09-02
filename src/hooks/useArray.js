import {
  useDebugValue,
  useState,
} from 'react';

const useArray = (initialValue, debugValue = '') => {
  const [array, setArray] = useState(initialValue);

  const push = (element) => {
    setArray((a) => [...a, element]);
  };

  const filter = (callback) => {
    setArray((a) => a.filter(callback));
  };

  const update = (index, newElement) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (index) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  };

  const clear = () => {
    setArray([]);
  };

  useDebugValue(`${debugValue} (${array.length})`);

  return { array, setArray, push, filter, update, remove, clear };
};

export default useArray;
