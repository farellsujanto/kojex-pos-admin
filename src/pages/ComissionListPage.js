import React, { useState, useEffect, useContext } from 'react';
import { SalesContext } from '../store/Context';

import _ from 'lodash';

import {
    Card,
    CardHeader,
    Col,
    Nav,
    NavItem,
    Button
} from "reactstrap";

import DataTables from '../components/DataTables';

export default () => {

    const [sales] = useContext(SalesContext);
    const [comissionDatas, setComissionDatas] = useState([]);

    function getDiscountedPrice(price, disc) {
        return (price * (100 - disc) / 100)
    }

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
                        comission: (getDiscountedPrice(sale.price, sale.disc) * sale.qty) * sale.fee.beautician / 100
                    });
                }

                if (sale.fee.doctor) {
                    newComissions.push({
                        date: dat.date,
                        time: dat.time,
                        name: sale.staff.doctor,
                        serviceName: sale.name,
                        perc: sale.fee.doctor,
                        comission: (getDiscountedPrice(sale.price, sale.disc) * sale.qty) * sale.fee.doctor / 100
                    });
                }

                if (sale.fee.nurse) {
                    newComissions.push({
                        date: dat.date,
                        time: dat.time,
                        name: sale.staff.nurse,
                        serviceName: sale.name,
                        perc: sale.fee.nurse,
                        comission: (getDiscountedPrice(sale.price, sale.disc) * sale.qty) * sale.fee.nurse / 100
                    });
                }
            });

        });
        setComissionDatas(newComissions);

    }, [sales]);

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

    function decodeDate(date) {
        const newDate = date.split("-");
        return [newDate[0], newDate[1], newDate[2]];
    }

    function decodeIndividualDatas() {
        let mappedDatas = {};
        comissionDatas.forEach((comissionData) => {
            const [, m ,y] = decodeDate(comissionData.date);

            const key = m + '-' + y + '#' + comissionData.name;

            if (mappedDatas[key]) {
                mappedDatas[key] += comissionData.comission;
            } else {
                mappedDatas[key] = comissionData.comission;
            }
        });

        let output = [[]];
        Object.keys(mappedDatas).forEach((key, index) => {
            const [date, name] = key.split("#");
            output.push([index + 1, date, name, Number(mappedDatas[key]).toLocaleString('id')]);
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
                        <h3 className="mb-0">Komisi Bulanan</h3>
                    </CardHeader>
                    <DataTables items={decodeIndividualDatas} headers={["#", "Bln/ Thn", "Nama", "Total Komisi"]} suffix={["", "", "", ""]} />
                </Card>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Seluruh Komisi</h3>
                    </CardHeader>
                    <DataTables items={decodeComissionDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>
    );
}