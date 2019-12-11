import React, { useState } from 'react';

import { Modal, Button, Form, Col, Dropdown } from "react-bootstrap";

import { firebaseApp } from '../../utils/Firebase';

export default ({ show, handleClose }) => {

    const ROLES = ["beautician", "nurse", "doctor"];

    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    function resetData() {
        setName('');
        setRole('');
    }

    function addStaff() {
        if (name === '') {
            window.alert("Silahkan isi kolom yang kosong");
            return;
        }
        if (role === '') {
            window.alert("Silahkan isi kolom yang kosong");
            return;
        }

        const staffRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('staffs');

        staffRef.add({ name: name, role: role })
            .then(() => {
                window.alert("Staff berhasil ditambahkan!");
                resetData();
                handleClose();
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi");
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambahkan Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col><Form.Label>Nama Staff</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={name}
                            placeholder="Farell Sujanto"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Nama Barang</Form.Label></Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {role ? role : 'Pilih Pekerjaan'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    ROLES.map((role) => {
                                        return (
                                            <Dropdown.Item key={role} onClick={() => setRole(role)}>{role}</Dropdown.Item>
                                        );
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={addStaff}>Tambahkan</Button>
            </Modal.Footer>
        </Modal>
    );
}