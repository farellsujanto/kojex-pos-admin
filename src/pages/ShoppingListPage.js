import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

import ShopDetailsModal from '../components/ShopDetailsModal';

export default () => {

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [shops, setShops] = useState([]);
    
    const [searchDate, setSearchDate] = useState('');

    const [currenShopData, setCurrentShopData] = useState({
        date: '',
        user: '',
        allowance: '',
        remaining: '',
        formDatas: [],
        adtFormDatas: [],
        imageRef: '',
    });

    useEffect(() => {

        const unsubscribeItems = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("shops")
            .onSnapshot((snapshot) => {
                let newShops = [];
                snapshot.forEach((snap) => {
                    newShops.push({
                        id: snap.id,
                        data: snap.data(),
                    });
                });
                setShops(newShops);
            });

        return () => unsubscribeItems();
    }, []);

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }

    function prepareToShowDetailsModal(data) {
        setCurrentShopData(data);
        setShowDetailsModal(true);
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
                        shops ?
                            shops.map((shop) => {
                                if (!searchDate || searchDate === shop.data.date) {
                                    return (
                                        <tr key={shop.id}>
                                            <td>{shop.data.date}</td>
                                            <td>{decodeEmail(shop.data.user)}</td>
                                            <td>
                                                <Button
                                                    onClick={() => prepareToShowDetailsModal(shop.data)}
                                                    block>Lihat</Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            }) : null
                    }
                </tbody>
            </Table>

            <ShopDetailsModal
                data={currenShopData}
                show={showDetailsModal}
                handleClose={() => setShowDetailsModal(false)} />
        </Container>
    );
}