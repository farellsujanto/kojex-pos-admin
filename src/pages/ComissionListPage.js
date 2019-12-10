import React, { useState, useEffect, useContext } from 'react';
import { SalesContext } from '../store/Context';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

import DataTables from '../components/DataTables';

export default () => {

    const [sales] = useContext(SalesContext);
    const [comissionDatas, setComissionDatas] = useState([]);

    useEffect(() => {
        let newComissions = [];
        sales.forEach((dat) => {

            dat.sales.forEach((sale) => {
                if (sale.fee.beautician) {
                    newComissions.push({
                        date: dat.date,
                        time: dat.time,
                        name: sale.staff.beautician,
                        serviceName: sale.name,
                        perc: sale.fee.beautician,
                        comission: (sale.price * sale.qty) * sale.fee.beautician / 100
                    });
                }

                if (sale.fee.doctor) {
                    newComissions.push({
                        date: dat.date,
                        time: dat.time,
                        name: sale.staff.doctor,
                        serviceName: sale.name,
                        perc: sale.fee.doctor,
                        comission: (sale.price * sale.qty) * sale.fee.doctor / 100
                    });
                }

                if (sale.fee.nurse) {
                    newComissions.push({
                        date: dat.date,
                        time: dat.time,
                        name: sale.staff.nurse,
                        serviceName: sale.name,
                        perc: sale.fee.nurse,
                        comission: (sale.price * sale.qty) * sale.fee.nurse / 100
                    });
                }
            });

        });
        setComissionDatas(newComissions);

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