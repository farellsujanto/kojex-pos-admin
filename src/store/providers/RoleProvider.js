import React, { useState, useEffect, useContext } from 'react';

import { RoleContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);

    const [role, setRole] = useState('');

    useEffect(() => {
        if (auth) {
            const unsubscribeUser = firebaseApp.firestore()
                .collection('company')
                .doc("First")
                .collection("users")
                .doc(firebaseApp.auth().currentUser.uid)
                .onSnapshot((snap) => {
                    if (snap.exists) {
                        setRole(snap.data().role);
                    } else {
                        setRole('none');
                    }
                })

            return () => unsubscribeUser();
        } else {
            setRole('none');
        }
    }, [auth]);

    return (
        <RoleContext.Provider value={[role, setRole]}>
            {children}
        </RoleContext.Provider>
    );
}
