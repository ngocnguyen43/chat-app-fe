import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

// const links = [
//     "/signin",
//     "/login-options",
//     "/passkey",
// ]
const HomeHOC: React.FC<React.HTMLAttributes<React.ReactNode>> = ({ children }) => {
  const {
    entity: { userId: key },
  } = useAppSelector((state) => state.information);
  return key && key.length === 36 ? <Navigate to={'/me'} /> : children;
};
export default HomeHOC;
