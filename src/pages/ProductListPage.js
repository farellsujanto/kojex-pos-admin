import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import NotificationModal from '../components/NotificationModal';

import { Container, Row, Col, Form, Button, Table, Modal, InputGroup, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';

function FormComponent({ type, title, placeholder, changeListener }) {
    return (
        <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                onChange={(e) => changeListener(e.target.value)} />
        </Form.Group>
    );
}

function AddItemModal({ show, handleClose }) {

    const UNITS = ["kg", "box", "pcs"];

    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState(0);
    const [markup, setMarkup] = useState(0);
    const [currentUnit, setCurrentUnit] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    async function addItem() {
        if (
            itemId === '' &&
            itemName === '' &&
            price === 0 &&
            markup === 0 &&
            currentUnit === ''
        ) {
            window.alert("Tolong isi semua kolom yang kosong");
            return;
        }

        const item = {
            itemId: itemId,
            itemName: itemName,
            price: price,
            markup: markup,
            currentUnit: currentUnit,
        }

        setIsLoading(true);

        const isIdDuplicate = await checkForDuplicateIds(itemId);
        if (!isIdDuplicate) {
            saveItemToDb(item);
        } else {
            setIsLoading(false);
            window.alert("Id sudah terdaftar, silahkan masukan Id yang lain");
        }
    }

    async function checkForDuplicateIds(itemId) {
        const item = await firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .doc(itemId)
            .get();

        return item.exists;
    }

    function saveItemToDb(item) {
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .doc(item.itemId)
            .set(item, { merge: true })
            .then(() => {
                window.alert("Barang telah berhasil ditambah")
                setIsLoading(false);
                handleClose();
            }).catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan silahkan coba lagi")
                setIsLoading(false);
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormComponent
                        title="Id Barang"
                        type="text"
                        placeholder="001 ABC"
                        changeListener={setItemId}
                    />
                    <FormComponent
                        title="Nama Barang"
                        type="text"
                        placeholder="Wortel"
                        changeListener={setItemName}
                    />
                    <FormComponent
                        title="Harga"
                        type="number"
                        placeholder="10000"
                        changeListener={setPrice}
                    />

                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title="Satuan"
                            id="input-group-dropdown-1"
                        >
                            {
                                UNITS.map((unit) => {
                                    return <Dropdown.Item
                                        key={unit}
                                        onClick={(_) => setCurrentUnit(unit)} >
                                        {unit}
                                    </Dropdown.Item>
                                })
                            }
                        </DropdownButton>
                        <Form.Control aria-describedby="basic-addon1" value={currentUnit} readOnly />
                    </InputGroup>
                    <FormComponent
                        title="Mark Up"
                        type="number"
                        placeholder="20"
                        changeListener={setMarkup}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Tutup
                    </Button>
                <Button
                    variant="primary"
                    onClick={addItem}
                    disabled={isLoading}>
                    {
                        !isLoading ? "Tambah" :
                            (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {' '}Loading...
                                </>
                            )

                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ItemTableRowComponent({ itemData }) {

    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function deleteItemFromDb() {
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .doc(itemData.itemId)
            .delete();
    }

    return (
        <tr key={itemData.itemId}>
            <td>{itemData.itemId}</td>
            <td>{itemData.itemName}</td>
            <td>{formatNumber(itemData.price)}</td>
            <td>{itemData.markup} %</td>
            <td>{formatNumber(Number(itemData.price) * (100 + Number(itemData.markup)) / 100)}</td>
            <td>
                <Button onClick={deleteItemFromDb} variant="danger" block>Delete</Button>
            </td>
        </tr>
    );
}

export default () => {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const [itemDatas, setItemDatas] = useState([]);

    const handleClose = () => setShowAddModal(false);
    const handleShow = () => setShowAddModal(true);

    useEffect(() => {
        const unsubscribe = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items").onSnapshot((snapshot) => {
                let newItems = [];
                snapshot.forEach((snap) => {
                    newItems.push(snap.data());
                });
                setItemDatas(newItems);
            });

        return () => unsubscribe();
    }, [])

    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        <b>Cari Nama Barang</b>
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
                        <th>Nama Barang</th>
                        <th>Harga</th>
                        <th>Mark Up</th>
                        <th>Harga Jual</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemDatas ?
                            itemDatas.map((itemData) => {
                                return (
                                    <ItemTableRowComponent
                                        key={itemData.itemId}
                                        itemData={itemData} />
                                );
                            }) : null
                    }
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