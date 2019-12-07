import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

export default () => {

    const [staffs, setStaffs] = useState([[]]);

    useEffect(() => {
        const unsubscribeServices = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("staffs")
            .onSnapshot((snapshot) => {
                let newStaffs = [];
                let index = 0;
                snapshot.forEach((snap) => {
                    const newStaff = [
                        ++index,
                        snap.data().name,
                        snap.data().role,
                    ];
                    newStaffs.push(newStaff);
                });
                setStaffs(newStaffs);
            });
        return () => unsubscribeServices();
    }, []);

    const headers = ["#", "Nama", "Pekerjan"];
    const suffix = ["", "", ""];

    return (
        <div>
            <DataTables items={staffs} headers={headers} suffix={suffix} />
        </div>

    );
}