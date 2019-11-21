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
                    Report Per Item
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Satuan</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wortel</td>
                                <td>Kg</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div>
                    Restoran A
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Satuan</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wortel</td>
                                <td>Kg</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </Table>
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