import React, { useState } from 'react';

import { firebaseApp } from '../../utils/Firebase';

import {
    Modal,
    Form
} from 'react-bootstrap';

import {
    Col,
    Button,
} from "reactstrap";

function AddItemModal({ show, handleClose }) {

    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [composition, setComposition] = useState('');
    const [series, setSeries] = useState('');
    const [stock, setStock] = useState(0);
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);

    function closeModal() {
        setName('');
        setNick('');
        setComposition('');
        setSeries('');
        setStock(0);
        setSize('');
        setPrice(0);
        handleClose();
    }

    function addDataToDb() {

        if (name === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (nick === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (series === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (composition === 0) {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (size === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }

        const data = {
            name: name,
            nick: nick,
            series: series,
            stock: stock,
            composition: composition,
            size: size,
            price: price
        }
        const itemRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('items');

        itemRef.add(data)
            .then(() => {
                closeModal();
                window.alert("Data berhasil ditambahkan");
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi.");
            });
    }

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Tambahkan Data Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col><Form.Label>Nama Dagang</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={name}
                            placeholder="Alterne Skincare Lightening Night Cream"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Nama Barang</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={nick}
                            placeholder="CREAM MALAM WHITENING"
                            type="text"
                            onChange={(e) => setNick(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Komposisi</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={composition}
                            placeholder="Whitenol 0,8"
                            type="text"
                            onChange={(e) => setComposition(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Series</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={series}
                            placeholder="LIGHTENING SERIES (melasma)"
                            type="text"
                            onChange={(e) => setSeries(e.target.value)}
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
                    <Col><Form.Label>Kuantitas Stock</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={stock}
                            type="number"
                            onChange={(e) => setStock(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Size</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={size}
                            placeholder="10ml"
                            type="text"
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button color="link" onClick={closeModal}>Close</Button>
                <Button color="success" onClick={addDataToDb}>+ Tambahkan</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddItemModal;