import React, { useState } from 'react';

import NotificationModal from '../components/NotificationModal';

import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';

function AddItemModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nama Barang</Form.Label>
                        <Form.Control type="text" placeholder="Wortel" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nama Harga</Form.Label>
                        <Form.Control type="number" placeholder="10000" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mark Up</Form.Label>
                        <Form.Control type="number" placeholder="20" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Tutup
                    </Button>
                <Button variant="primary" onClick={handleClose}>
                    Tambah
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default () => {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleClose = () => setShowAddModal(false);
    const handleShow = () => setShowAddModal(true);

    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        <b>Cari Nama User</b>
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Search" />
                    </Col>
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Farell</td>
                        <td>farell123</td>
                        <td>
                            <Button variant="danger" block>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={handleShow}>+ Barang</Button>
            {' '}
            <Button onClick={() => setShowNotification(true)}>Edit MarkUp</Button>

            <NotificationModal 
            show={showNotification}
            handleClose={() => setShowNotification(false)}
            title="Notifikasi"
            body="Berhasil" />
            <AddItemModal show={showAddModal} handleClose={handleClose} />
        </Container>
    );
}