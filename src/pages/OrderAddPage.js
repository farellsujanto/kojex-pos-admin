import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/Firebase';

import { Container, Row, Col, Form, Button, Table, Dropdown, InputGroup, FormControl, DropdownButton } from 'react-bootstrap';

function ItemDropdownMenu({ items, setItem, formDataIndex, itemFilter }) {
    return (
        <>
            {
                items ?
                    items.map((item) => {
                        if (item.data.itemName) {
                            const itemToSearch = item.data.itemName.toLowerCase();
                            const searchFilter = itemFilter.toLowerCase();
                            if (itemToSearch.includes(searchFilter)) {
                                return (
                                    <Dropdown.Item
                                        key={item.id}
                                        onClick={() => setItem(formDataIndex, item)}
                                    >
                                        {item.data.itemName}
                                    </Dropdown.Item>
                                );
                            }
                        }
                        return null;
                    }) : null
            }
        </>
    );
}

function RestaurantDropdownMenu({ restaurants, setData }) {
    const [restaurantFilter, setRestaurantFilter] = useState('');

    return (
        <DropdownButton
            variant="secondary"
            title="Restoran"
            id="input-group-dropdown-1"
        >
            <FormControl
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={e => setRestaurantFilter(e.target.value)}
                value={restaurantFilter}
            />
            {
                restaurants ?
                    restaurants.map((restaurant) => {
                        if (restaurant.data.name) {
                            const itemToSearch = restaurant.data.name.toLowerCase();
                            const searchFilter = restaurantFilter.toLowerCase();
                            if (itemToSearch.includes(searchFilter)) {
                                return (
                                    <Dropdown.Item
                                        key={restaurant.id}
                                        onClick={() => setData(restaurant.data.name)}
                                    >
                                        {restaurant.data.name}
                                    </Dropdown.Item>
                                );
                            }
                        }
                        return null;
                    }) : null
            }
        </DropdownButton>
    );
}

export default () => {

    const [restaurants, setRestaurants] = useState([]);
    const [items, setitems] = useState('');

    // Form
    const [formDatas, setFormDatas] = useState([{ itemName: '', qty: '', itemUnit: '' }]);
    const [restaurantName, setRestaurantName] = useState('');
    const [date, setDate] = useState('');

    // Filter
    const [itemFilter, setItemFilter] = useState('');


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
        setFormDatas([...formDatas, { itemName: '', qty: '', itemUnit: '' }]);
    }

    function removeFormRow(index) {
        let newFormData = [...formDatas];
        newFormData.splice(index, 1);
        setFormDatas(newFormData)
    }

    function setFormDataItem(index, item) {
        let newFormDatas = [...formDatas];
        newFormDatas[index].itemName = item.data.itemName;
        newFormDatas[index].itemUnit = item.data.itemUnit;
        setFormDatas(newFormDatas)
    }

    function setFormDataQty(index, qty) {
        const newQty = Number(qty);
        let newFormDatas = [...formDatas];
        newFormDatas[index].qty = newQty;
        setFormDatas(newFormDatas)
    }

    function checkFormDatas() {

        if (formDatas.length === 0) {
            return false;
        }

        let output = true;

        for (const formData of formDatas) {
            if (
                formData.itemName === '' ||
                formData.qty === '' ||
                formData.itemUnit === ''
            ) {
                output = false;
            }
        }
        return output;
    }

    function resetData() {
        setRestaurantName('');
        setFormDatas([{ itemName: '', qty: '', itemUnit: '' }]);
    }

    function addDataToDb() {

        if (
            date !== '' &&
            restaurantName !== '' &&
            checkFormDatas()
        ) {

            const orderRef = firebaseApp.firestore()
                .collection('company')
                .doc("First")
                .collection("orders");

            const data = {
                formDatas: formDatas,
                date: date,
                restaurantName: restaurantName,
                user: firebaseApp.auth().currentUser.email,
            }

            orderRef.add(data)
                .then(() => {
                    resetData();
                    window.alert("Input data berhasil");
                }).catch((e) => {
                    console.log(e);
                    window.alert("Input data gagal, silahkan coba lagi");
                })

        } else {
            window.alert("Mohon isi semua data yang kosong");
        }


    }

    return (
        <Container>
            <Form.Group as={Row}>
                <Form.Label column sm={4}>
                    Tanggal Belanja
                    </Form.Label>
                <Col sm={8}>
                    <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
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
                            setData={setRestaurantName} />
                        <Form.Control value={restaurantName} readOnly />
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
                                            <Dropdown>
                                                <DropdownButton
                                                    variant="secondary"
                                                    title="Barang"
                                                    id="input-group-dropdown-1"
                                                >
                                                    <Dropdown.Menu>
                                                        <FormControl
                                                            autoFocus
                                                            className="mx-3 my-2 w-auto"
                                                            placeholder="Type to filter..."
                                                            onChange={e => setItemFilter(e.target.value)}
                                                            value={itemFilter}
                                                        />
                                                        <ItemDropdownMenu
                                                            formDataIndex={index}
                                                            items={items}
                                                            setItem={setFormDataItem}
                                                            itemFilter={itemFilter}
                                                        />
                                                    </Dropdown.Menu>
                                                </DropdownButton>

                                            </Dropdown>

                                            <Form.Control aria-describedby="basic-addon1" value={formData.itemName} readOnly />
                                        </InputGroup>
                                    </td>
                                    <td>{formData.itemUnit}</td>
                                    <td><Form.Control type="number" value={formData.qty} onChange={(e) => setFormDataQty(index, e.target.value)} /></td>
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
            <Button onClick={addDataToDb}>Kirim</Button>
        </Container>
    );
}