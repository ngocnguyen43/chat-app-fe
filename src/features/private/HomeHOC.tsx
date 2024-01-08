import React from 'react';
import { Navigate } from 'react-router-dom';

import { Storage } from '../../service/LocalStorage';

// const links = [
//     "/signin",
//     "/login-options",
//     "/passkey",
// ]
const HomeHOC: React.FC<React.HTMLAttributes<React.ReactNode>> = ({ children }) => {
    const key = Storage.Get("key")
    return (
        (key && key.length === 36) ? <Navigate to={"/me"} /> : children
    )
}
export default HomeHOC