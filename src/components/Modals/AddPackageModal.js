import React, { useState, useContext } from 'react';

import { firebaseApp } from '../../utils/Firebase';
import { ItemsContext } from '../../store/Context';

import {
    Modal,
    Form,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';

import {
    Col,
    Button,
    Row,
} from "reactstrap";

function ItemDropdownMenu({ setItemData, dataIndex }) {

    const [items] = useContext(ItemsContext);
    const [searchFilter, setSearchFilter] = useState('');

    return (

        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Barang
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={e => setSearchFilter(e.target.value)}
                    value={searchFilter}
                />
                <div style={{ overflowY: 'scroll', height: '200px' }}>
                    {
                        items ?
                            items.map((item, index) => {
                                if (item.name) {
                                    const itemToSearch = item.name.toLowerCase();
                                    const searchFilterLowered = searchFilter.toLowerCase();
                                    if (itemToSearch.includes(searchFilterLowered)) {
                                        return (
                                            <Dropdown.Item
                                                key={item.id}
                                                onClick={() => setItemData(dataIndex, item)}
                                                className="pt-2 pb-2"
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        );
                                    }
                                }
                                return null;

                            }) : null
                    }
                </div>

            </Dropdown.Menu>
        </Dropdown>

    );
}

function AddPackageModal({ show, handleClose }) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [itemDatas, setItemDatas] = useState([{ id: '', name: '', price: '', qty: 0 }])

    function resetData() {
        setName('');
        setPrice('');
        setItemDatas([{ id: '', name: '', price: '', qty: 0 }]);
    }

    function closeModal() {
        resetData();
        handleClose();
    }

    function isItemDatasEmpty() {
        let output = false;

        itemDatas.forEach((item) => {
            if (
                item.id === '' ||
                item.name === '' ||
                item.price === '' ||
                item.qty === 0
            ) {
                output = true;
            }
        });

        return output;
    }

    function addDataToDb() {
        if (
            name === '' ||
            price === '' ||
            isItemDatasEmpty()
        ) {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }

        const data = {
            name: name,
            price: Number(price),
            items: itemDatas
        }
        const itemRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('packages');

        itemRef.add(data)
            .then(() => {
                closeModal();
                window.alert("Data berhasil ditambahkan");
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi.");
            });


    }

    function setItemQty(index, qty) {
        const newItemDatas = [...itemDatas];
        newItemDatas[index].qty = Number(qty);
        setItemDatas(newItemDatas);
    }

    function setItemData(index, data) {
        const newItemDatas = [...itemDatas];
        newItemDatas[index].id = data.id;
        newItemDatas[index].name = data.name;
        newItemDatas[index].price = data.price;
        setItemDatas(newItemDatas);
    }

    function removeItemIndex(index) {
        const newItemDatas = [...itemDatas];
        newItemDatas.splice(index, 1);
        setItemDatas(newItemDatas);
    }

    function addNewItemRow() {
        const newItemDatas = [...itemDatas];
        newItemDatas.push({ id: '', name: '', price: '', qty: 0 });
        setItemDatas(newItemDatas);
    }

    return (
        <Modal show={show} onHide={closeModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Tambahkan Data Paket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col><Form.Label>Nama Paket</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={name}
                            placeholder="Paket 1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Harga</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={price}
                            placeholder="0"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Col>
                    <Row>
                        <Col md={{ offset: 2, size: 6 }}>
                            Nama Barang
                            </Col>
                        <Col md={2}>
                            Qty.
                            </Col>
                    </Row>
                </Col>

                {
                    itemDatas ?
                        itemDatas.map((itemData, index) => {
                            return (
                                < Form.Group >
                                    <Col>
                                        <Row>
                                            <Col md={2}>
                                                <ItemDropdownMenu
                                                    dataIndex={index}
                                                    setItemData={setItemData}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control value={itemData.name} readOnly />
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    value={itemData.qty}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={(e) => setItemQty(index, e.target.value)}
                                                />
                                            </Col>
                                            <Col>
                                                <Button color="danger" onClick={() => removeItemIndex(index)}>-</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form.Group>
                            )
                        }) : null

                }

                <Col>
                    <Button color="primary" onClick={addNewItemRow}>+ Tambahkan Barang</Button>
                </Col>




            </Modal.Body>
            <Modal.Footer>
                <Button color="link" onClick={closeModal}>Close</Button>
                <Button color="success" onClick={addDataToDb}>+ Tambahkan</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default AddPackageModal;