import React from 'react';

import PathProvider from './providers/PathProvider';
import AuthProvider from './providers/AuthProvider';

const Store = ({ children }) => {

    return (
        <AuthProvider>
            <PathProvider>
                {children}
            </PathProvider>
        </AuthProvider>
    );
}

export default Store;