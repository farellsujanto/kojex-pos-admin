import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, Col } from "react-bootstrap";

import { firebaseApp } from '../../utils/Firebase';

export default ({ show, handleClose, service }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [beautician, setBeautician] = useState(0);
    const [doctor, setDoctor] = useState(0);
    const [nurse, setNurse] = useState(0);
    const [id, setId] = useState('');

    useEffect(() => {
        if (service) {
            setName(service.name);
            setPrice(service.price);
            setDesc(service.desc);
            setBeautician(service.fee.beautician);
            setDoctor(service.fee.doctor);
            setNurse(service.fee.nurse);
            setId(service.id);
        }
    }, [service]);

    function resetData() {
        setName('');
        setDesc('');
        setPrice(0);
        setBeautician(0);
        setDoctor(0);
        setNurse(0);
    }

    function editService() {
        if (name === '') {
            window.alert("Silahkan isi kolom yang kosong");
            return;
        }
        if (price === 0) {
            window.alert("Silahkan isi kolom yang kosong");
            return;
        }

        const serviceRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('services')
            .doc(id);

        serviceRef.update({
            name: name,
            price: price,
            desc: desc,
            fee: {
                beautician: beautician,
                doctor: doctor,
                nurse: nurse
            }
        })
            .then(() => {
                window.alert("Jasa berhasil diubah!");
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
                <Modal.Title>Edit Jasa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col><Form.Label>Nama Jasa</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={name}
                            placeholder="Peeling"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Harga</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col><Form.Label>Komisi Beautician</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={beautician}
                            type="number"
                            onChange={(e) => setBeautician(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col><Form.Label>Komisi Dokter</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={doctor}
                            type="number"
                            onChange={(e) => setDoctor(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col><Form.Label>Komisi Perawat</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={nurse}
                            type="number"
                            onChange={(e) => setNurse(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col><Form.Label>Deskripsi</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={desc}
                            placeholder="Peeling"
                            type="text"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Col>
                </Form.Group>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>Close</Button>
                <Button variant="success" onClick={editService}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );
}