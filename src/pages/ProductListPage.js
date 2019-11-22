import React, { useState, useEffect, useCallback } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table, Modal, InputGroup, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';

import DeleteModal from '../components/DeleteModal';

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
    const [currentUnit, setCurrentUnit] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    async function addItem() {
        if (
            itemId === '' &&
            itemName === '' &&
            price === 0 &&
            currentUnit === ''
        ) {
            window.alert("Tolong isi semua kolom yang kosong");
            return;
        }

        const item = {
            itemId: itemId,
            itemName: itemName,
            price: price,
            itemUnit: currentUnit,
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
                handleClose();
                window.alert("Barang telah berhasil ditambah")
                setIsLoading(false);

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

function EditMarkupModal({ show, handleClose }) {

    const [markup, setMarkup] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    function updateMarkup() {
        setIsLoading(true);
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .doc("markup")
            .set({
                perc: markup
            }, { merge: true })
            .then(() => {
                window.alert("Markup telah berhasil diubah")
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
                        title="Markup"
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
                    onClick={updateMarkup}
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


function ItemTableRowComponent({ itemData, markup, prepareToDeleteId }) {

    const [markupPrice, setMarkupPrice] = useState(0);

    useEffect(() => {
        setMarkupPrice(getMarkedupPrice());
    }, [markup, itemData]);

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

    function getMarkedupPrice() {

        const price = Number(itemData.price);
        const markupPercentage = Number(markup) + 100;

        const markedupPrice = price * markupPercentage / 100

        return formatNumber(Math.ceil(markedupPrice));
    }

    return (
        <tr>
            <td>{itemData.itemId}</td>
            <td>{itemData.itemName}</td>
            <td>{itemData.itemUnit}</td>
            <td>{formatNumber(itemData.price)}</td>
            <td>{markup} %</td>
            <td>{markupPrice}</td>
            <td>
                <Button
                    onClick={() => prepareToDeleteId(itemData.itemId)}
                    variant="danger" block
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default () => {

    const [searchText, setSearchText] = useState('');
    const [idToDelete, setIdToDelete] = useState('');

    const [markup, setMarkup] = useState(0);

    const [itemDatas, setItemDatas] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const addModalHandleClose = () => setShowAddModal(false);
    const addModalHandleShow = () => setShowAddModal(true);

    const [showEditMarkupModal, setShowEditMarkupModal] = useState(false);
    const editMarkupModalHandleClose = () => setShowEditMarkupModal(false);
    const editMarkupModalHandleShow = () => setShowEditMarkupModal(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const deleteModalHandleClose = () => setShowDeleteModal(false);
    const deleteModalHandleShow = () => setShowDeleteModal(true);

    useEffect(() => {
        const unsubscribe = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items").onSnapshot((snapshot) => {
                let newItems = [];
                snapshot.forEach((snap) => {
                    if (snap.id !== "markup") {
                        newItems.push(snap.data());
                    } else {
                        setMarkup(snap.data().perc);
                    }
                });
                setItemDatas(newItems);
            });

        return () => unsubscribe();
    }, []);

    function prepareToDeleteId(itemId) {
        deleteModalHandleShow();
        setIdToDelete(itemId);
    }

    function deleteItemFromDb() {
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .doc(idToDelete)
            .delete()
            .then(() => {
                deleteModalHandleClose();
                window.alert("Barang telah dihapus")
            }).catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan silahkan coba lagi")
            });
    }


    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        <b>Cari Nama Barang</b>
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nama Barang</th>
                        <th>Satuan</th>
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

                                const itemName = itemData.itemName.toLowerCase();
                                const searchName = searchText.toLowerCase();

                                if (itemName.includes(searchName)) {
                                    return (
                                        <ItemTableRowComponent
                                            key={itemData.itemId}
                                            itemData={itemData}
                                            markup={markup}
                                            prepareToDeleteId={prepareToDeleteId}
                                        />
                                    );
                                }
                                return null;
                            }) : null
                    }
                </tbody>
            </Table>
            <Button onClick={addModalHandleShow}>+ Barang</Button>
            {' '}
            <Button onClick={editMarkupModalHandleShow}>Edit MarkUp</Button>

            <DeleteModal show={showDeleteModal} handleClose={deleteModalHandleClose} handleConfirmation={deleteItemFromDb} />
            <EditMarkupModal show={showEditMarkupModal} handleClose={editMarkupModalHandleClose} />
            <AddItemModal show={showAddModal} handleClose={addModalHandleClose} />
        </Container>
    );
}