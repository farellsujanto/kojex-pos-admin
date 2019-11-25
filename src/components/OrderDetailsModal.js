import React, { useState, useEffect } from 'react';

import { Modal, Button, Row, Col, Table } from 'react-bootstrap';

export default ({ show, handleClose, title, currentData }) => {

    const [reports, setReports] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        setReports([]);
        defineNewReport();
    }, [show]);

    function defineNewReport() {
        let newReports = [];
        if (currentData.orders.length) {
            currentData.orders.forEach((order) => {
                if (order.formDatas.length) {
                    order.formDatas.forEach((formData) => {
                        const name = formData.itemName;
                        const unit = formData.itemUnit;
                        const qty = formData.qty;
                      
                        if (newReports[name + '#' + unit]) {
                            newReports[name + '#' + unit].qty += Number(qty);
                        } else {
                            newReports[name + '#' + unit] = {
                                qty: Number(qty),
                            };
                        }
                    });
                }
            });
        }
        setReports(newReports);
        setKeys(Object.keys(newReports));
    }


    function decodeKey(key) {
        const splittedKey = key.split('#');
        return [splittedKey[0], splittedKey[1]];
    }

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={4}>
                        <b>Tanggal Belanja</b>
                    </Col>
                    <Col sm={8}>
                        {currentData.date}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <b>Nama Penginput</b>
                    </Col>
                    <Col sm={8}>
                        {decodeEmail(currentData.user)}
                    </Col>
                </Row>
                <div>
                    <br />
                    <b>Report Per Item</b>
                    <br />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Satuan</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                keys ?
                                    keys.map((key) => {
                                        const [name, unit] = decodeKey(key);
                                        return (
                                            <tr key={key}>
                                                <td>{name}</td>
                                                <td>{unit}</td>
                                                <td>{reports[key].qty}</td>
                                            </tr>
                                        );
                                    }) : null
                            }

                        </tbody>
                    </Table>
                </div>

                {
                    currentData.orders ?
                        currentData.orders.map((order, index) => {
                            return (
                                <div key={index}>
                                    <br />
                                    <b>{order.restaurantName}</b>
                                    <br />
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Satuan</th>
                                                <th>Jumlah</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.formDatas ?
                                                    order.formDatas.map((formData, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{formData.itemName}</td>
                                                                <td>{formData.itemUnit}</td>
                                                                <td>{formData.qty}</td>
                                                            </tr>
                                                        );
                                                    }) : null
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            );
                        }) : null
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}