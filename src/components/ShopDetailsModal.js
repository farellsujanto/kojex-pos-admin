import React from 'react';

import { Modal, Button, Row, Col, Table } from 'react-bootstrap';

export default ({ show, handleClose, title }) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={4}>
                        Tanggal Belanja
                    </Col>
                    <Col sm={8}>
                        12 / 09 / 19
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        Nama Penginput
                    </Col>
                    <Col sm={8}>
                        Pembeli
                    </Col>
                </Row>
                <div>
                    Laporan Pembelian
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Satuan</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Harga Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001 WW</td>
                                <td>Wortel</td>
                                <td>Kg</td>
                                <td>10</td>
                                <td>10</td>
                                <td>100</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    Laporan Biaya Lain Lain
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Row>
                        <Col sm={4}>Total Belanja</Col>
                        <Col sm={8}>158000</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Total Uang Belanja</Col>
                        <Col sm={8}>200000</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Sisa Uang</Col>
                        <Col sm={8}>42000</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Sisa Uang Pembeli</Col>
                        <Col sm={8}>42000</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Selisih</Col>
                        <Col sm={8}>0</Col>
                    </Row>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}