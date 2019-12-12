import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../../utils/Firebase';

import {
    Modal,
    Form
} from 'react-bootstrap';

import {
    Col,
    Button,
    Table

} from "reactstrap";

function EditItemModal({ show, handleClose, itemData }) {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [composition, setComposition] = useState('');
    const [series, setSeries] = useState('');
    const [priceList, setPriceList] = useState([{ size: '', price: 0 }]);

    useEffect(() => {
        if (itemData) {
            setId(itemData.id);
            setName(itemData.name);
            setNick(itemData.nick);
            setComposition(itemData.composition);
            setSeries(itemData.series);
            setPriceList(itemData.priceList);
        }
    }, [itemData]);

    function closeModal() {
        setId('');
        setName('');
        setNick('');
        setComposition('');
        setSeries('');
        setPriceList([{ size: '', price: 0 }]);
        handleClose();
    }

    function validatePriceList() {
        for (let i = 0; i < priceList.length; i++) {
            if (priceList[i].size === '' || priceList[i].price === 0) {
                return false;
            }
        }
        return true;
    }

    function updateData() {

        if (name === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (nick === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (series === '') {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (composition === 0) {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }
        if (!validatePriceList()) {
            window.alert("Tolong isi kolom yang kosong");
            return;
        }

        const data = {
            name: name,
            nick: nick,
            series: series,
            composition: composition,
            priceList: priceList
        }
        const itemRef = firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('items')
            .doc(id);

        itemRef.update(data)
            .then(() => {
                window.alert("Data berhasil di edit");
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi.");
            });
    }

    function addPriceListRow() {
        setPriceList([...priceList, { size: '', price: 0 }]);
    }

    function setPriceListSize(index, value) {
        let newPriceList = [...priceList];
        newPriceList[index].size = value;
        setPriceList(newPriceList);
    }

    function setPriceListPrice(index, value) {
        let newPriceList = [...priceList];
        newPriceList[index].price = value;
        setPriceList(newPriceList);
    }

    function removePriceListRow(index) {
        let newPriceList = [...priceList];
        newPriceList.splice(index, 1);
        setPriceList(newPriceList);
    }

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Ubah Data Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col><Form.Label>Nama Dagang</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={name}
                            placeholder="Alterne Skincare Lightening Night Cream"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Nama Barang</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={nick}
                            placeholder="CREAM MALAM WHITENING"
                            type="text"
                            onChange={(e) => setNick(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Komposisi</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={composition}
                            placeholder="Whitenol 0,8"
                            type="text"
                            onChange={(e) => setComposition(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col><Form.Label>Series</Form.Label></Col>
                    <Col>
                        <Form.Control
                            value={series}
                            placeholder="LIGHTENING SERIES (melasma)"
                            type="text"
                            onChange={(e) => setSeries(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Table>
                    <thead>
                        <tr>
                            <th>Ukuran</th>
                            <th>Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            priceList ?
                                priceList.map((list, index) => {
                                    return (
                                        <tr ke={index}>
                                            <td>
                                                <Form.Control
                                                    value={list.size}
                                                    placeholder="10ml"
                                                    type="text"
                                                    onChange={(e) => setPriceListSize(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    value={list.price}
                                                    type="number"
                                                    onChange={(e) => setPriceListPrice(index, Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <Button color="danger" onClick={() => removePriceListRow(index)}>-</Button>
                                            </td>
                                        </tr>
                                    );
                                }) : null
                        }
                    </tbody>
                </Table>
                <Form.Group>
                    <Col><Button color="success" onClick={addPriceListRow}>+</Button></Col>
                </Form.Group>



            </Modal.Body>
            <Modal.Footer>
                <Button color="link" onClick={closeModal}>Close</Button>
                <Button color="success" onClick={updateData}>Ubah</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditItemModal;