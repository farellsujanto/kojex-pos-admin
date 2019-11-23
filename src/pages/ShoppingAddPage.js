import React from 'react';

import { Container, Row, Col, Form, Button, Table, Dropdown, InputGroup, DropdownButton } from 'react-bootstrap';

export default () => {
    return (
        <Container>
            <Form>
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
                        Jumlah Uang Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="number" />
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                        Sisa Uang Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="number" />
                    </Col>
                </Form.Group>
            </Form>

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
                            <InputGroup className="mb-3">
                                <DropdownButton
                                    variant="outline-light"
                                    title="Satuan"
                                    id="input-group-dropdown-1"
                                >
                                    <Dropdown.Item>A</Dropdown.Item>
                                    <Dropdown.Item>B</Dropdown.Item>
                                   
                                </DropdownButton>
                                <Form.Control aria-describedby="basic-addon1" value={""} readOnly />
                            </InputGroup>
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
            Lampiran<br />
            <Button>Upload Foto</Button> <br /><br />
            <Button>Rekap</Button>
        </Container>
    );
}