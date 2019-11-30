import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table, Modal, Spinner } from 'react-bootstrap';

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


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    async function addItem() {
        if (
            name === '' &&
            address === ''
        ) {
            window.alert("Tolong isi semua kolom yang kosong");
            return;
        }

        const restaurantData = {
            name: name,
            address: address,
        }
        saveRestaurantToDb(restaurantData);

    }

    function resetData() {
        setName('');
        setAddress('');
    }

    function saveRestaurantToDb(restaurantData) {
        setIsLoading(true);
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("restaurants")
            .add(restaurantData)
            .then(() => {
                handleClose();
                window.alert("Barang telah berhasil ditambah")
                setIsLoading(false);
                resetData();
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
                        title="Nama Restoran"
                        type="text"
                        placeholder="Steak House"
                        changeListener={setName}
                    />
                    <FormComponent
                        title="Alamat"
                        type="text"
                        placeholder="Kemuning"
                        changeListener={setAddress}
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

function ItemTableRowComponent({ restaurantData, prepareToDeleteId }) {

    return (
        <tr>
            <td>{restaurantData.data.name}</td>
            <td>{restaurantData.data.address}</td>
            <td>
                <Button
                    onClick={() => prepareToDeleteId(restaurantData.id)}
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

    const [restaurantDatas, setRestaurantDatas] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const addModalHandleClose = () => setShowAddModal(false);
    const addModalHandleShow = () => setShowAddModal(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const deleteModalHandleClose = () => setShowDeleteModal(false);
    const deleteModalHandleShow = () => setShowDeleteModal(true);

    useEffect(() => {
        const unsubscribe = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("restaurants").onSnapshot((snapshot) => {
                let newRestaurants = [];
                snapshot.forEach((snap) => {
                    newRestaurants.push({
                        id: snap.id,
                        data: snap.data(),
                    });
                });
                setRestaurantDatas(newRestaurants);
            });

        return () => unsubscribe();
    }, []);

    function prepareToDeleteId(restaurantId) {
        setIdToDelete(restaurantId);
        deleteModalHandleShow();
        
    }

    function deleteItemFromDb() {
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("restaurants")
            .doc(idToDelete)
            .delete()
            .then(() => {
                deleteModalHandleClose();
                window.alert("Restoran telah dihapus")
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
                        <b>Cari Nama Restoran</b>
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Nama Restoran</th>
                        <th>Alamat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurantDatas ?
                            restaurantDatas.map((restaurantData) => {

                                const restaurantname = restaurantData.data.name.toLowerCase();
                                const searchName = searchText.toLowerCase();

                                if (restaurantname.includes(searchName)) {
                                    return (
                                        <ItemTableRowComponent
                                            key={restaurantData.id}
                                            restaurantData={restaurantData}
                                            prepareToDeleteId={prepareToDeleteId}
                                        />
                                    );
                                }
                                return null;
                            }) : null
                    }
                </tbody>
            </Table>
            <Button onClick={addModalHandleShow}>+ Restoran</Button>

            <DeleteModal show={showDeleteModal} handleClose={deleteModalHandleClose} handleConfirmation={deleteItemFromDb} />
            <AddItemModal show={showAddModal} handleClose={addModalHandleClose} />
        </Container>
    );
}