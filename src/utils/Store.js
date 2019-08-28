import React, { useState, createContext } from 'react';

export const NameContext = createContext('Name');
export const PathContext = createContext('Path');

const Store = ({ children }) => {

    const [name, setName] = useState("ASDSAD");
    const [path, setPath] = useState("/")

    return (
        <NameContext.Provider value={[name, setName]}>
            <PathContext.Provider value={[path, setPath]}>
                {children}
            </PathContext.Provider>
        </NameContext.Provider>
    );
}

export default Store;