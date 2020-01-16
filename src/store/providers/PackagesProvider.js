import React, { useState, useEffect, useContext } from 'react';

import { PackagesContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);
    const [packages, setPackages] = useState([]);


    useEffect(() => {
        if (auth) {
            const unsubscribeItems = firebaseApp.firestore()
                .collection('clinics')
                .doc("GABRIEL")
                .collection("packages")
                .onSnapshot((snapshot) => {
                    let newPackages = [];
                    snapshot.forEach((snap) => {
                        let newData = snap.data();
                        newData.id = snap.id;
                        newPackages.push(newData);
                    });
                    setPackages(newPackages);
                });
            return () => unsubscribeItems();
        }
    }, [auth]);


    return (
        <PackagesContext.Provider value={[packages, setPackages]}>
            {children}
        </PackagesContext.Provider>
    );
}
