import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

import OrderDetailsModal from '../components/OrderDetailsModal';

export default () => {

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [orders, setOrders] = useState([]);
    const [keys, setKeys] = useState([]);
    const [currentData, setCurrentData] = useState({ date: '', user: '', orders: [] });

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

                    if (newOrders[date + '#' + user]) {
                        newOrders[date + '#' + user].push(snap.data());
                    } else {
                        newOrders[date + '#' + user] = [snap.data()];
                    }

                });
                setOrders(newOrders);
                setKeys(Object.keys(newOrders));
            })

        return () => unsubscribeOrder();

    }, []);

    function decodeKey(key) {
        const splittedKey = key.split('#');
        return [splittedKey[0], splittedKey[1]];
    }

    function openDetailsModal(date, user) {
        const newCurrentData = {
            date: date,
            user: user,
            orders: orders[date + '#' + user]
        };

        setCurrentData(newCurrentData);
        setShowDetailsModal(true);
    }

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }

    return (
        <Container>
            <OrderDetailsModal
                title="ORDER"
                show={showDetailsModal}
                currentData={currentData}
                handleClose={() => setShowDetailsModal(false)} />
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Tanggal Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="date" />
                    </Col>
                </Form.Group>
            </Form>
            <Button>Cari</Button>

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
                                const [date, user] = decodeKey(key);

                                return (
                                    <tr key={key}>
                                        <td>{date}</td>
                                        <td>{decodeEmail(user)}</td>
                                        <td>
                                            <Button onClick={() => openDetailsModal(date, user)} block>Lihat</Button>
                                        </td>
                                    </tr>
                                );
                            }) : null
                    }
                </tbody>
            </Table>
        </Container>
    );
}