import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const mount = document.getElementById('portal-root');
  const e = document.createElement('div');

  useEffect(() => {
    mount.appendChild(e);
    return () => mount.removeChild(e);
  }, [e, mount]);

  return createPortal(children, e);
};

export default Portal;
