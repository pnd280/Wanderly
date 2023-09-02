import {
  useDebugValue,
  useEffect,
} from 'react';

import useArray from '@hooks/useArray';
import useLocalStorage from '@hooks/useLocalStorage';

const useArrayLocalStorage = (key) => {
  const [storedValue, setValue] = useLocalStorage(key, []);

  const { array, push, filter, update, remove, clear } = useArray(storedValue, key);

  useEffect(() => {
    setValue(array);
  }, [array]);

  useDebugValue(`useCart (${storedValue.length})`);

  return { storedValue, setValue, push, filter, update, remove, clear };
};

export default useArrayLocalStorage;
