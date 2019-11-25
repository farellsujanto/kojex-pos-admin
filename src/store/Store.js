import React from 'react';

import PathProvider from './providers/PathProvider';
import AuthProvider from './providers/AuthProvider';
import RoleProvider from './providers/RoleProvider';

const Store = ({ children }) => {

    return (
        <AuthProvider>
            <RoleProvider>
                <PathProvider>
                    {children}
                </PathProvider>
            </RoleProvider>
        </AuthProvider>
    );
}

export default Store;