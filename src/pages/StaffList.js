import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

import DataTables from '../components/DataTables';

export default () => {

    const [staffs, setStaffs] = useState([[]]);

    useEffect(() => {
        const unsubscribeStaffs = firebaseApp.firestore()
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
        return () => unsubscribeStaffs();
    }, []);

    const headers = ["#", "Nama", "Pekerjan"];
    const suffix = ["", "", ""];

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={staffs} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>
    );
}