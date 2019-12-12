import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';

import {
    Modal,
    Form
} from 'react-bootstrap';

import {
    Col,
    Button,
} from "reactstrap";

function EditStockModal({ show, handleClose, itemData }) {

    const [id, setId] = useState('');
    const [currentStock, setCurrentstock] = useState(0);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        if (itemData) {
            setId(itemData.id);
            setCurrentstock(itemData.stock);
        }
    }, [itemData]);

    function closeModal() {
        setId('');
        setCurrentstock(0);
        setStock(0);
        handleClose();
    }

    function updateStock(status) {

        const itemRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('items')
            .doc(id);


        const stockValue = status === 'dec' ? -stock : stock;
        const stat = firebase.firestore.FieldValue.increment(stockValue);

        itemRef.update({ stock: stat })
            .then(() => {
                closeModal();
                window.alert("Data berhasil di edit");
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi.");
            });
    }


    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Ubah Data Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col><h3>Stock saat ini: {currentStock}</h3></Col>
                <Form.Group>
                    <Col><Form.Label>Ubah Stock</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={stock}
                            type="number"
                            onChange={(e) => setStock(Number(e.target.value))}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button color="link" onClick={closeModal}>Close</Button>
                <Button color="danger" onClick={() => updateStock('dec')}>Kurangi</Button>
                <Button color="success" onClick={() => updateStock('inc')}>Tambah</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStockModal;