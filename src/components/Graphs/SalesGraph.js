import React, { useState, useContext } from 'react';
import { SalesContext } from '../../store/Context';

import moment from 'moment';

import { Line } from 'react-chartjs-2';

import {
    Card,
    CardHeader,
    Col,
    Row,
    Button,
    Nav,
    NavItem,
    CardBody
} from "reactstrap";

import {
    Dropdown
} from "react-bootstrap";

function getDiscountedPrice(price, disc) {
    return (price * (100 - disc) / 100)
}

function MonthLineGraph({ currYear, setCurrYear, currMonth, setCurrMonth, decodeMonth, yearGroup, monthGroup, options, data }) {
    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Grafik Bulanan</h3>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {currYear ? currYear : 'Pilih Tahun'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    yearGroup.map((year) => {
                                        return (
                                            <Dropdown.Item key={year} onClick={() => setCurrYear(year)}>{year}</Dropdown.Item>
                                        );
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                        {
                            currYear ?
                                (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {currMonth ? decodeMonth(currMonth) : 'Pilih Bulan'}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                monthGroup.map((month) => {
                                                    return (
                                                        <Dropdown.Item key={month} onClick={() => setCurrMonth(month)}>{decodeMonth(month)}</Dropdown.Item>
                                                    );
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : null
                        }
                    </CardHeader>


                    <Line
                        data={data}
                        options={options}
                    />
                </Card>
            </Col>
        </>
    );
}

function YearLineGraph({ currYear, setCurrYear, yearGroup, options, data }) {
    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Grafik Tahunan</h3>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {currYear ? currYear : 'Pilih Tahun'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    yearGroup.map((year) => {
                                        return (
                                            <Dropdown.Item key={year} onClick={() => setCurrYear(year)}>{year}</Dropdown.Item>
                                        );
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </CardHeader>


                    <Line
                        data={data}
                        options={options}
                    />
                </Card>
            </Col>
        </>
    );
}

function SalesGraph() {

    const [sales] = useContext(SalesContext);

    const [view, setView] = useState('');
    const [currYear, setCurrYear] = useState(undefined);
    const [currMonth, setCurrMonth] = useState(undefined);

    function getDateData(date) {
        const result = date.split("-");
        return [Number(result[0]), Number(result[1]), Number(result[2])];
    }

    function totalPrice(sales) {
        let price = 0;
        sales.forEach((sale) => {
            price += (getDiscountedPrice(sale.price, sale.disc) * sale.qty);
        });
        return price;
    }

    function cleanTotalPrice(sales) {
        let price = 0;
        sales.forEach((sale) => {
            price += (getDiscountedPrice(sale.price, sale.disc) * sale.qty) * (100 - sale.fee.beautician - sale.fee.doctor - sale.fee.nurse) / 100;
        });
        return price;
    }


    function groupYear() {
        let yearList = [];
        sales.forEach((salesData) => {
            const [, , yr] = getDateData(salesData.date);
            if (!yearList.includes(yr)) {
                yearList.push(yr);
            }
        });
        return yearList;
    }

    function groupMonth() {
        let monthList = [];
        sales.forEach((salesData) => {
            const [, mon, yr] = getDateData(salesData.date);
            if (yr === currYear) {
                if (!monthList.includes(mon)) {
                    monthList.push(mon);
                }
            }
        });
        return monthList;
    }

    function decodeMonth(month) {
        return moment().month(month).format("MMMM");
    }

    function getDataByYearAndMonth() {
        let dayData = [];
        let cleanDayData = [];
        let dayLabel = [];
        const dayInMonth = moment(currYear + '-' + currMonth, "YYYY-MM").daysInMonth();
        for (let i = 0; i < dayInMonth; i++) {
            dayData.push(0);
            cleanDayData.push(0);
            dayLabel.push("Tgl. " + (i + 1));
        }

        sales.forEach((salesData) => {
            const [day, mon, yr] = getDateData(salesData.date);
            if (yr === currYear && mon === currMonth) {
                dayData[day] = dayData[day] + totalPrice(salesData.sales);
                cleanDayData[day] = cleanDayData[day] + cleanTotalPrice(salesData.sales);
            }
        });

        const chartData = {
            labels: dayLabel,
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
                    data: dayData
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
                    data: cleanDayData
                }
            ]
        };


        return chartData;
    }

    function getDataByYear() {
        const yearLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];
        let yearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let cleanYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        sales.forEach((salesData) => {
            const [, mon, yr] = getDateData(salesData.date);
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
            <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                                        </h6>
                            <h2 className="text-white mb-0">Sales value</h2>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <Button onClick={() => setView('mon')}>Bulanan</Button>
                                </NavItem>
                                <NavItem>
                                    <Button onClick={() => setView('yr')}>Tahunan</Button>
                                </NavItem>
                            </Nav>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    {
                        view === 'mon' ?
                            (
                                <MonthLineGraph
                                    currYear={currYear}
                                    setCurrYear={setCurrYear}
                                    currMonth={currMonth}
                                    setCurrMonth={setCurrMonth}
                                    yearGroup={groupYear()}
                                    monthGroup={groupMonth()}
                                    data={getDataByYearAndMonth()}
                                    decodeMonth={decodeMonth}
                                    options={options}
                                />
                            ) : null
                    }
                    {
                        view === 'yr' ?
                            (
                                <YearLineGraph
                                    currYear={currYear}
                                    setCurrYear={setCurrYear}
                                    yearGroup={groupYear()}
                                    data={getDataByYear()}
                                    options={options}
                                />
                            ) : null
                    }
                </CardBody>
            </Card>
        </>
    );

}

export default SalesGraph;