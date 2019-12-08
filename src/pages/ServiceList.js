import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

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
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={services} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>

    );
}