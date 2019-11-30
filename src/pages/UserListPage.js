import React, { useState, useEffect } from 'react';
import { firebaseApp, secondaryApp } from '../utils/Firebase';

import DeleteModal from '../components/DeleteModal';

import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';

const DOMAIN_EXTENSION = "decodesmedia.com";

function AddUserModal({ show, handleClose }) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function resetData() {
        setUserName('');
        setPassword('');
    }

    function registerUser() {
        if (userName !== '' && password !== '') {
            const email = userName + '@' + DOMAIN_EXTENSION;
            secondaryApp.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {

                    firebaseApp.firestore()
                        .collection('company')
                        .doc('First')
                        .collection('users')
                        .doc(secondaryApp.auth().currentUser.uid)
                        .set({
                            email: email,
                            password: password,
                            uid: secondaryApp.auth().currentUser.uid,
                            role: 'user',
                        }).then(() => {
                            secondaryApp.auth().signOut();
                            window.alert("Pengguna berhasil dibuat");
                            handleClose();
                        }).catch((e) => {
                            window.alert("Terjadi kesalahan, silahkan coba lagi");
                        });


                }).catch((e) => {
                    window.alert("Terjadi kesalahan, silahkan coba lagi");
                    console.log(e);
                })
        } else {
            window.alert("Tolong isi semua data yang ada");
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Tutup
                    </Button>
                <Button variant="primary" onClick={registerUser}>
                    Tambah
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default () => {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [users, setUsers] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [userToDelete, setUserToDelete] = useState('');

    useEffect(() => {

        const unsubscribeUser = firebaseApp.firestore()
            .collection('company')
            .doc("First")
            .collection("users")
            .onSnapshot((snapshot) => {
                let newUsers = [];
                snapshot.forEach((snap) => {
                    newUsers.push(snap.data());
                });
                setUsers(newUsers);
            });

        return () => unsubscribeUser();

    }, []);

    const handleClose = () => setShowAddModal(false);
    const handleShow = () => setShowAddModal(true);

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }

    function prepareToDelete(uid) {
        setUserToDelete(uid);
        setShowDeleteModal(true);
    }

    function deleteUser() {
        firebaseApp.firestore()
            .collection('company')
            .doc("First")
            .collection("users")
            .doc(userToDelete)
            .delete()
            .then(() => {
                window.alert("Pengguna telah dihapus");
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi");
            });
    }

    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        <b>Cari Nama User</b>
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => setUserSearch(e.target.value)} type="text" placeholder="Search" />
                    </Col>
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users ?
                            users.map((user) => {
                                if (decodeEmail(user.email).includes(userSearch) && user.role !== 'admin') {
                                    return (
                                        <tr key={user.email}>
                                            <td>{user.uid}</td>
                                            <td>{decodeEmail(user.email)}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                <Button
                                                    onClick={() => prepareToDelete(user.uid)}
                                                    variant="danger"
                                                    block>Delete</Button>
                                            </td>
                                        </tr>
                                    );
                                }

                            }) : null
                    }


                </tbody>
            </Table>
            <Button onClick={handleShow}>+ User</Button>
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteUser} />
            <AddUserModal show={showAddModal} handleClose={handleClose} />
        </Container>
    );
}