import React, { useState, useEffect, useContext } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

import { RoleContext } from '../store/Context';

import DeleteModal from '../components/DeleteModal';
import OrderDetailsModal from '../components/OrderDetailsModal';

export default () => {

    const [role] = useContext(RoleContext);

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [orders, setOrders] = useState([]);
    const [keys, setKeys] = useState([]);
    const [currentData, setCurrentData] = useState({ date: '', user: '', orders: [] });

    const [searchDate, setSearchDate] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {

        const unsubscribeOrder = firebaseApp.firestore()
            .collection('company')
            .doc("First")
            .collection("orders")
            .onSnapshot((snapshot) => {
                let newOrders = [];
                snapshot.forEach((snap) => {
                    const date = snap.data().date;
                    const user = snap.data().user;
                    const id = snap.id;

                    if (newOrders[date + '#' + user + '#' + id]) {
                        newOrders[date + '#' + user + '#' + id].push(snap.data());
                    } else {
                        newOrders[date + '#' + user + '#' + id] = [snap.data()];
                    }

                });
                setOrders(newOrders);
                setKeys(Object.keys(newOrders));
            })

        return () => unsubscribeOrder();

    }, []);

    function decodeKey(key) {
        const splittedKey = key.split('#');
        return [splittedKey[0], splittedKey[1], splittedKey[2]];
    }

    function openDetailsModal(date, user, id) {
        const newCurrentData = {
            date: date,
            user: user,
            orders: orders[date + '#' + user + '#' + id]
        };

        setCurrentData(newCurrentData);
        setShowDetailsModal(true);
    }

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }

    function prepareToShowDeleteModal(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    function deleteData() {
        firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("orders")
            .doc(deleteId)
            .delete()
            .then(() => {
                setShowDeleteModal(false);
                window.alert("Data telah dihapus");
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
                        Tanggal Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="date" onChange={(e) => setSearchDate(e.target.value)} />
                    </Col>
                </Form.Group>
            </Form>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Tanggal Belanja</th>
                        <th>Nama Penginput</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        keys ?
                            keys.map((key) => {
                                const [date, user, id] = decodeKey(key);
                                if (!searchDate || searchDate === date) {
                                    return (
                                        <tr key={key}>
                                            <td>{date}</td>
                                            <td>{decodeEmail(user)}</td>
                                            <td>
                                                <Button onClick={() => openDetailsModal(date, user, id)} block>Lihat</Button>
                                                {
                                                    role === 'admin' ?
                                                        (
                                                            <Button
                                                            variant="danger"
                                                                onClick={() => prepareToShowDeleteModal(id)}
                                                                block>Delete</Button>
                                                        ) : null
                                                }
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;

                            }) : null
                    }
                </tbody>
            </Table>
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteData} />
                 <OrderDetailsModal
                title="ORDER"
                show={showDetailsModal}
                currentData={currentData}
                handleClose={() => setShowDetailsModal(false)} />
        </Container>
    );
}