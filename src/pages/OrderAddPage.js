import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table, Dropdown, InputGroup, DropdownButton } from 'react-bootstrap';

function ItemDropdownMenu({ items, setItem, formDataIndex }) {
    return (
        <DropdownButton
            variant="secondary"
            title="Barang"
            id="input-group-dropdown-1"
        >
            {
                items ?
                    items.map((item) => {
                        return (
                            <Dropdown.Item
                                key={item.id}
                                onClick={() => setItem(formDataIndex, item)}
                            >
                                {item.data.itemName}
                            </Dropdown.Item>
                        );
                    }) : null
            }
        </DropdownButton>
    );
}

function RestaurantDropdownMenu({ restaurants, setData }) {
    return (
        <DropdownButton
            variant="secondary"
            title="Restoran"
            id="input-group-dropdown-1"
        >
            {
                restaurants ?
                    restaurants.map((restaurant) => {
                        return (
                            <Dropdown.Item
                                key={restaurant.id}
                                onClick={() => setData(restaurant.id)}
                            >
                                {restaurant.data.name}
                            </Dropdown.Item>
                        );
                    }) : null
            }
        </DropdownButton>
    );
}

export default () => {

    const [restaurants, setRestaurants] = useState([]);
    const [items, setitems] = useState('');

    // Form
    const [formDatas, setFormDatas] = useState([{ item: {id: ''}, qty: '' }]);
    const [restaurantId, setRestaurantId] = useState('');

    useEffect(() => {
        const unsubscribeRestaurants = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("restaurants")
            .onSnapshot((snapshot) => {
                let newRestaurants = [];
                snapshot.forEach((snap) => {
                    newRestaurants.push({
                        id: snap.id,
                        data: snap.data(),
                    });
                });
                setRestaurants(newRestaurants);
            });

        const unsubscribeItems = firebaseApp.firestore()
            .collection("company")
            .doc("First")
            .collection("items")
            .onSnapshot((snapshot) => {
                let newItems = [];
                snapshot.forEach((snap) => {
                    newItems.push({
                        id: snap.id,
                        data: snap.data(),
                    });
                });
                setitems(newItems);
            });

        return () => {
            unsubscribeRestaurants();
            unsubscribeItems();
        };
    }, []);

    function addFormRow() {
        setFormDatas([...formDatas, { item: {id: ''}, qty: '' }]);
    }

    function removeFormRow(index) {
        let newFormData = [...formDatas];
        newFormData.splice(index, 1);
        setFormDatas(newFormData)
    }

    function getRestaurantName() {
        let restaurantName = "";
        if (restaurants) {
            restaurants.forEach((restaurant) => {
                if (restaurant.id === restaurantId) {
                    restaurantName = restaurant.data.name;
                }
            });
        }
        return restaurantName;
    }

    function getItemName(index) {
        let itemName = "";
        if (items) {
            items.forEach((item) => {
                if (item.id === formDatas[index].itemId) {
                    itemName = item.data.itemName;
                }
            });
        }

        return itemName;
    }

    function setFormDataItem(index, item) {
        let newFormDatas = [...formDatas];
        newFormDatas[index].item = item;
        setFormDatas(newFormDatas)
    }

    function setFormDataQty(index, qty) {
        const newQty = Number(qty);
        let newFormDatas = [...formDatas];
        newFormDatas[index].qty = newQty;
        setFormDatas(newFormDatas)
    }

    return (
        <Container>
            <Form.Group as={Row}>
                <Form.Label column sm={4}>
                    Tanggal Belanja
                    </Form.Label>
                <Col sm={8}>
                    <Form.Control type="date" onChange={(e) => console.log(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={4}>
                    Nama Restoran
                    </Form.Label>
                <Col sm={8}>
                    <InputGroup className="mb-3">
                        <RestaurantDropdownMenu
                            restaurants={restaurants}
                            setData={setRestaurantId} />
                        <Form.Control value={getRestaurantName()} readOnly />
                    </InputGroup>
                </Col>
            </Form.Group>

            Input Pembelian<br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Satuan</th>
                        <th>Jumlah</th>
                        <th>Harga Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formDatas.map((formData, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <InputGroup className="mb-3">
                                            <ItemDropdownMenu
                                                formDataIndex={index}
                                                items={items}
                                                setItem={setFormDataItem}
                                            />
                                            <Form.Control aria-describedby="basic-addon1" value={formData.item.data ? formData.item.data.itemName : ''} readOnly />
                                        </InputGroup>
                                    </td>
                                    <td>Username</td>
                                    <td><Form.Control type="number" value={formData.qty} onChange={(e) => setFormDataQty(index, e.target.value)} /></td>
                                    <td><Form.Control type="number" /></td>
                                    <td>
                                        <Button onClick={() => removeFormRow(index)} variant="danger" block>-</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={addFormRow}>+</Button> <br /><br />
            <Button>Kirim</Button>
        </Container>
    );
}