import React from 'react';

import { Container, Row, Col, Form, Button, Table, Dropdown } from 'react-bootstrap';

export default () => {
    return (
        <Container>
            <Form.Group as={Row}>
                <Form.Label column sm={4}>
                    Tanggal Belanja
                    </Form.Label>
                <Col sm={8}>
                    <Form.Control type="date" />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={4}>
                    Nama Restoran
                    </Form.Label>
                <Col sm={8}>
                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                            </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                </Col>
            </Form.Group>

            Input Pembelian<br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Satuan</th>
                        <th>Jumlah</th>
                        <th>Harga Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                            </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Wortel - Kg</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Wortel - Pcs</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td>Username</td>
                        <td><Form.Control type="number" /></td>
                        <td><Form.Control type="number" /></td>
                        <td>
                            <Button variant="danger" block>-</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button>+</Button> <br /><br />
            <Button>Kirim</Button>
        </Container>
    );
}