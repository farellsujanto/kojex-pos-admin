import React, { useState, useEffect, useContext } from 'react';
import { ServiceContext } from '../store/Context';


import DataTables from '../components/DataTables';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

export default () => {

    const [services] = useContext(ServiceContext);
    const [serviceDatas, setServiceDatas] = useState([[]]);

    useEffect(() => {
        let newServices = [];
        services.forEach((service, index) => {
            const newService = [
                index + 1,
                service.name,
                service.price,
                service.fee.beautician,
                service.fee.doctor,
                service.fee.nurse,
                service.desc
            ];
            newServices.push(newService);
        });
        setServiceDatas(newServices);
    }, [services]);

    const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan"];
    const suffix = ["", "", "CURR", " %", " %", " %", ""];

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={serviceDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>

    );
}