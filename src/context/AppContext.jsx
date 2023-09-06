import {
  createContext,
  useRef,
  useState,
} from 'react';

import { PropTypes } from 'prop-types';

const AppContext = createContext({
  merchs: [],
  setMerchs: () => {},
  merchFetched: false,
});

export const AppContextProvider = ({ children }) => {
  const [merchs, setMerchs] = useState([]);
  const merchFetched = useRef(false);

  return (
    <AppContext.Provider value={{ merchs, setMerchs, merchFetched }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
