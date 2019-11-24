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

export default () => {

    const [items, setitems] = useState('');

    const [formDatas, setFormDatas] = useState([{ itemName: '', price: '', qty: '', itemUnit: '' }]);

    const [date, setDate] = useState('');
    const [allowance, setAllowance] = useState(0);
    const [remaining, setRemaining] = useState(0);

    const [file, setFile] = useState('');

    const [imageSrc, setimageSrc] = useState('');

    useEffect(() => {

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

        return () => unsubscribeItems();
    }, []);

    function removeFormRow(index) {
        let newFormData = [...formDatas];
        newFormData.splice(index, 1);
        setFormDatas(newFormData)
    }

    function setFormDataItem(index, item) {
        let newFormDatas = [...formDatas];
        newFormDatas[index].itemName = item.data.itemName;
        // newFormDatas[index].price = item.data.price;
        newFormDatas[index].itemUnit = item.data.itemUnit;
        setFormDatas(newFormDatas)
    }

    function addFormRow() {
        setFormDatas([...formDatas, { itemName: '', price: '', qty: '', itemUnit: '' }]);
    }

    function addDataToDb() {
        console.log("======")
        console.log(date, allowance, remaining)
        console.log(formDatas)
        console.log(file)
        console.log("======")

        // const storageRef = firebaseApp.storage().ref();
        // const refPath = 'images/' + file.name;
        // const imageRef = storageRef.child(refPath);
        // imageRef.put(file)
        // .then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // }).catch((e) => {
        //     console.log(e);
        // });
    }

    function setFormDataQty(index, qty) {
        const newQty = Number(qty);
        let newFormDatas = [...formDatas];
        newFormDatas[index].qty = newQty;
        setFormDatas(newFormDatas)
    }

    function setFormDataPrice(index, price) {
        const newPrice = Number(price);
        let newFormDatas = [...formDatas];
        newFormDatas[index].price = newPrice;
        setFormDatas(newFormDatas)
    }

    async function uploadImage(e) {

        const fileData = e.target.files[0];

        setFile(fileData);

        var fr = new FileReader();
        fr.onload = function () {
            setimageSrc(fr.result);
        }
        fr.readAsDataURL(fileData);
    }

    return (
        <Container>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                        Tanggal Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                        Jumlah Uang Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            value={allowance}
                            onChange={(e) => setAllowance(e.target.value)}
                            type="number" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                        Sisa Uang Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            value={remaining}
                            onChange={(e) => setRemaining(e.target.value)}
                            type="number" />
                    </Col>
                </Form.Group>
            </Form>

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
                                            <Form.Control aria-describedby="basic-addon1" value={formData.itemName} readOnly />
                                        </InputGroup>
                                    </td>
                                    <td>{formData.itemUnit}</td>
                                    <td><Form.Control type="number" value={formData.qty} onChange={(e) => setFormDataQty(index, e.target.value)} /></td>
                                    <td><Form.Control type="number" value={formData.price} onChange={(e) => setFormDataPrice(index, e.target.value)} /></td>
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
            Lampiran<br />
            <Button>Upload Foto</Button> <br /><br />
            <img src={imageSrc}/>
            <Form.Control type="file" onChange={(e) => uploadImage(e)}/>
            <Button onClick={addDataToDb}>Rekap</Button>
        </Container>
    );
}