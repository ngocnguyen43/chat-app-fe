import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthStageContext } from '../../store/context';

interface AuthPrivateProps extends React.HTMLAttributes<React.ReactNode> {
    options: 1 | 2 | 3
}
// const links = [
//     "/signin",
//     "/login-options",
//     "/passkey",
// ]
const AuthPrivate: React.FC<AuthPrivateProps> = ({ options, children }) => {
    const { stage } = React.useContext(AuthStageContext)
    return (
        stage === options ? children : <Navigate to={"/signin"} />
    )
}
export default AuthPrivate