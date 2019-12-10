import React, { useState, useEffect, useContext } from 'react';

import { SalesContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);
    const [sales, setSales] = useState([]);


    useEffect(() => {
        if (auth) {

            const unsubscribeSales = firebaseApp.firestore()
                .collection('clinics')
                .doc("GABRIEL")
                .collection("sales")
                .onSnapshot((snapshot) => {
                    let newSales = [];
                    snapshot.forEach((snap) => {
                        newSales.push(snap.data());
                    });
                    setSales(newSales);
                });
            return () => unsubscribeSales();

        }
    }, [auth]);


    return (
        <SalesContext.Provider value={[sales, setSales]}>
            {children}
        </SalesContext.Provider>
    );
}
