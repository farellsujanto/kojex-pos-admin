import React, { useState, useEffect, useContext } from 'react';

import { ServiceContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (auth) {
            const unsubscribeServices = firebaseApp.firestore()
                .collection('clinics')
                .doc("GABRIEL")
                .collection("services")
                .onSnapshot((snapshot) => {
                    let newServices = [];
                    snapshot.forEach((snap) => {
                        newServices.push(snap.data());
                    });
                    setServices(newServices);
                });
            return () => unsubscribeServices();
        }
    }, [auth]);


    return (
        <ServiceContext.Provider value={[services, setServices]}>
            {children}
        </ServiceContext.Provider>
    );
}
