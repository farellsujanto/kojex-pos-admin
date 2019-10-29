import React, { useState } from 'react';

import { PathContext } from './Context';

const Store = ({ children }) => {

    const [path, setPath] = useState("/");

    return (
        <PathContext.Provider value={[path, setPath]}>
            {children}
        </PathContext.Provider>
    );
}

export default Store;