import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

import DataTables from '../components/DataTables';

export default () => {

    // const [staffs, setStaffs] = useState([[]]);

    // const [salesDatas, setSalesDatas] = useState([]);
    const [comissionDatas, setComissionDatas] = useState([]);

    useEffect(() => {
        const unsubscribeStaffs = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("sales")
            .onSnapshot((snapshot) => {
                let newComissions = [];
                snapshot.forEach((snap) => {

                    snap.data().sales.forEach((sale) => {
                        if (sale.fee.beautician) {
                            newComissions.push({
                                date: snap.data().date,
                                time: snap.data().time,
                                name: sale.staff.beautician,
                                serviceName: sale.name,
                                perc: sale.fee.beautician,
                                comission: (sale.price * sale.qty) * sale.fee.beautician / 100
                            });
                        }

                        if (sale.fee.doctor) {
                            newComissions.push({
                                date: snap.data().date,
                                time: snap.data().time,
                                name: sale.staff.doctor,
                                serviceName: sale.name,
                                perc: sale.fee.doctor,
                                comission: (sale.price * sale.qty) * sale.fee.doctor / 100
                            });
                        }

                        if (sale.fee.nurse) {
                            newComissions.push({
                                date: snap.data().date,
                                time: snap.data().time,
                                name: sale.staff.nurse,
                                serviceName: sale.name,
                                perc: sale.fee.nurse,
                                comission: (sale.price * sale.qty) * sale.fee.nurse / 100
                            });
                        }
                    });

                });
                setComissionDatas(newComissions);
            });
        return () => unsubscribeStaffs();
    }, []);

    function decodeComissionDatas() {
        let output = [[]];
        comissionDatas.forEach((comissionData, index) => {
            const newO = [
                index + 1,
                comissionData.date,
                comissionData.name,
                comissionData.serviceName,
                comissionData.perc,
                comissionData.comission,
            ]
            output.push(newO);
        });
        return output;
    }

    const headers = ["#", "Tanggal", "Nama", "Jasa", "Perc", "Komisi"];
    const suffix = ["", "", "", "", " %", "CURR"];

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={decodeComissionDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>
    );
}