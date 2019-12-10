import React, { useState, useEffect, useContext } from 'react';

import { StaffContext, AuthContext } from '../Context';

import { firebaseApp } from '../../utils/Firebase';

export default ({ children }) => {

    const [auth] = useContext(AuthContext);
    const [staff, setStaff] = useState([]);


    useEffect(() => {
        if (auth) {
            const unsubscribeStaffs = firebaseApp.firestore()
                .collection('clinics')
                .doc("GABRIEL")
                .collection("staffs")
                .onSnapshot((snapshot) => {
                    let newStaffs = [];
                    snapshot.forEach((snap) => {
                        newStaffs.push(snap.data());
                    });
                    setStaff(newStaffs);
                });

            return () => unsubscribeStaffs();
        }
    }, [auth]);


    return (
        <StaffContext.Provider value={[staff, setStaff]}>
            {children}
        </StaffContext.Provider>
    );
}
