import React, { useState, useEffect, useContext } from 'react';
import { SalesContext } from '../store/Context';


import { Line } from 'react-chartjs-2';

import {
    Card,
    CardHeader,
    Col,
    Row
} from "reactstrap";

import {
    Dropdown
} from "react-bootstrap";

import DataTables from '../components/DataTables';

export default () => {

    const [salesDatas, setSalesDatas] = useState([]);
    const [currYear, setCurrYear] = useState(0);
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


    function getMonthAndYear(date) {
        const result = date.split("-");
        return [Number(result[1]), Number(result[2])];
    }

    function totalPrice(sales) {
        let price = 0;
        sales.forEach((sale) => {
            price += (sale.price * sale.qty);
        });
        return price;
    }

    function cleanTotalPrice(sales) {
        let price = 0;
        sales.forEach((sale) => {
            price += (sale.price * sale.qty) * (100 - sale.fee.beautician - sale.fee.doctor - sale.fee.nurse) / 100;
        });
        return price;
    }


    function groupYear() {
        let yearList = [];
        salesDatas.forEach((salesData) => {
            const [, yr] = getMonthAndYear(salesData.date);
            if (!yearList.includes(yr)) {
                yearList.push(yr);
            }
        });
        return yearList;
    }

    function getDataByYear() {
        const yearLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];
        let yearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let cleanYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        salesDatas.forEach((salesData) => {
            const [mon, yr] = getMonthAndYear(salesData.date);
            if (yr === currYear) {
                yearData[mon] = yearData[mon] + totalPrice(salesData.sales);
                cleanYearData[mon] = cleanYearData[mon] + cleanTotalPrice(salesData.sales);
            }
        });



        const chartData = {
            labels: yearLabel,
            datasets: [
                {
                    label: 'Omzet',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: yearData
                },
                {
                    label: 'Bersih',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,12,192,0.4)',
                    borderColor: 'rgba(0,12,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,12,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,12,192,1)',
                    pointHoverBorderColor: 'rgba(12,220,12,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: cleanYearData
                }
            ]
        };


        return chartData;
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    callback(value) {
                        return Number(value).toLocaleString('id')
                    }
                }
            }],

        }

    }

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
            <Row className="mt-3">
                <Col>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Card tables</h3>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {currYear ? currYear : 'Pilih Tahun'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        groupYear().map((year) => {
                                            return (
                                                <Dropdown.Item key={year} onClick={() => setCurrYear(year)}>{year}</Dropdown.Item>
                                            );
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </CardHeader>


                        <Line
                            data={getDataByYear()}
                            options={options}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}