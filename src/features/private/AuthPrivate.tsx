import { FC, HTMLAttributes, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthStageContext } from '../../store/context';

interface AuthPrivateProps extends HTMLAttributes<ReactNode> {
  options: 1 | 2 | 3;
}
// const links = [
//     "/signin",
//     "/login-options",
//     "/passkey",
// ]
const AuthPrivate: FC<AuthPrivateProps> = ({ options, children }) => {
  const { stage } = useContext(AuthStageContext);
  return stage === options ? children : <Navigate to={'/signin'} />;
};
export default AuthPrivate;
