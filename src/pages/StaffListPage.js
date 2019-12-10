import React, { useState, useEffect, useContext } from 'react';

import { StaffContext } from '../store/Context';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

import DataTables from '../components/DataTables';

export default () => {

    const [staffs] = useContext(StaffContext);
    const [staffDatas, setStaffDatas] = useState([[]]);

    useEffect(() => {
        let newStaffs = [];
        staffs.forEach((staff, index) => {
            newStaffs.push([
                index + 1,
                staff.name,
                staff.role
            ]);
        });
        setStaffDatas(newStaffs);
    }, [staffs]);

    const headers = ["#", "Nama", "Pekerjan"];
    const suffix = ["", "", ""];

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={staffDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>
    );
}