import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

export default () => {

    const [services, setServices] = useState([[]]);

    useEffect(() => {
        const unsubscribeServices = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("services")
            .onSnapshot((snapshot) => {
                let newServices = [];
                let index = 0;
                snapshot.forEach((snap) => {
                    const newService = [
                        ++index,
                        snap.data().name,
                        snap.data().price,
                        snap.data().fee.beautician,
                        snap.data().fee.doctor,
                        snap.data().fee.nurse,
                        snap.data().desc
                    ];
                    newServices.push(newService);
                });
                setServices(newServices);
            });
        return () => unsubscribeServices();
    }, []);

    const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan"];
    const suffix = ["", "", "CURR", " %", " %", " %", ""];

    return (
        <div>
            <DataTables items={services} headers={headers} suffix={suffix} />
        </div>

    );
}