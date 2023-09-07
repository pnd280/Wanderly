import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const mount = document.getElementById('portal-root');

  return createPortal(children, mount);
};

export default Portal;
