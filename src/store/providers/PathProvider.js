import React, { useState } from 'react';

import { PathContext } from '../Context';

export default ({ children }) => {

    const [path, setPath] = useState("/");

    return (
        <PathContext.Provider value={[path, setPath]}>
            {children}
        </PathContext.Provider>
    );
}
