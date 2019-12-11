import React, { useState, useEffect, useContext } from 'react';
import { SalesContext } from '../store/Context';

import {
    Card,
    CardHeader,
    Col,
    Row
} from "reactstrap";


import DataTables from '../components/DataTables';

export default () => {

    const [salesDatas, setSalesDatas] = useState([]);

    const [sales] = useContext(SalesContext);

    useEffect(() => {
        setSalesDatas(sales);
    }, [sales]);

    function decodeSalesDatas() {
        let output = [[]];
        salesDatas.forEach((salesData, index) => {
            const newO = [
                index + 1,
                salesData.date + ' ' + salesData.time
            ]
            output.push(newO);
        });
        return output;
    }

    const headers = ["#", "Waktu"];
    const suffix = ["", ""];

    return (
        <>
            <Row>
                <Col>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Card tables</h3>
                        </CardHeader>
                        <DataTables items={decodeSalesDatas} headers={headers} suffix={suffix} />
                    </Card>
                </Col>
            </Row>
           
        </>
    );
}