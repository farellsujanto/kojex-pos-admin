import React from 'react';

import PathProvider from './providers/PathProvider';
import AuthProvider from './providers/AuthProvider';
import StaffProvider from './providers/StaffProvider';
import SalesProvider from './providers/SalesProvider';
import ItemsProvider from './providers/ItemsProvider';
import ServiceProvider from './providers/ServiceProvider';

const Store = ({ children }) => {

    return (
        <AuthProvider>
            <StaffProvider>
                <SalesProvider>
                    <ItemsProvider>
                        <ServiceProvider>
                            <PathProvider>
                                {children}
                            </PathProvider>
                        </ServiceProvider>
                    </ItemsProvider>
                </SalesProvider>
            </StaffProvider>
        </AuthProvider>
    );
}

export default Store;