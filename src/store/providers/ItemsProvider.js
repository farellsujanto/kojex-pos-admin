import React, { useState, useEffect, useContext } from 'react';

import { ItemsContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (auth) {
            const unsubscribeItems = firebaseApp.firestore()
                .collection('clinics')
                .doc("GABRIEL")
                .collection("items")
                .onSnapshot((snapshot) => {
                    let newItems = [];
                    snapshot.forEach((snap) => {
                        let newData = snap.data();
                        newData.id = snap.id;
                        newItems.push(newData);
                    });
                    setItems(newItems);
                });
            return () => unsubscribeItems();
        }
    }, [auth]);


    return (
        <ItemsContext.Provider value={[items, setItems]}>
            {children}
        </ItemsContext.Provider>
    );
}
