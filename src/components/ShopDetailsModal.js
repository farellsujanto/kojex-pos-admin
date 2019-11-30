import React, { useEffect } from 'react';
import ReactToPdf from 'react-to-pdf';

import { Modal, Button, Row, Col, Table } from 'react-bootstrap';

export default ({ show, handleClose, data }) => {

    const ref = React.createRef();

    useEffect(() => {

    }, [])

    function decodeEmail(email) {
        const output = email.split('@');
        return output[0];
    }

    function getTotalPrice() {
        let tempTotalPrice = 0;
        if (data.formDatas.length) {
            data.formDatas.forEach((formData) => {
                tempTotalPrice += formData.price;
            });

        }
        if (data.adtFormDatas.length) {
            data.adtFormDatas.forEach((adtFormData) => {
                tempTotalPrice += adtFormData.price;
            });

        }
        return tempTotalPrice;
    }

    return (
        <Modal show={show} onHide={handleClose}  >
            <Modal.Header closeButton>
                <Modal.Title>Detail Belanja</Modal.Title>
                {' '}
                <ReactToPdf targetRef={ref} filename={'Detail Belanja ' + decodeEmail(data.user) + ' ' + data.date} >
                    {({ toPdf }) => (
                        <button onClick={toPdf}>Generate pdf</button>
                    )}
                </ReactToPdf>
            </Modal.Header>
            <Modal.Body  ref={ref}>

                <Row>
                    <Col sm={4}>
                        Tanggal Belanja
                    </Col>
                    <Col sm={8}>
                        {data.date}
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        Nama Penginput
                    </Col>
                    <Col sm={8}>
                        {decodeEmail(data.user)}
                    </Col>
                </Row>
                <div>
                    Laporan Pembelian
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Satuan</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Harga Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.formDatas ?
                                    data.formDatas.map((formData) => {
                                        return (
                                            <tr key={formData.id}>
                                                <td>{formData.id}</td>
                                                <td>{formData.itemName}</td>
                                                <td>{formData.itemUnit}</td>
                                                <td>{formData.qty}</td>
                                                <td>{formData.price / formData.qty}</td>
                                                <td>{formData.price}</td>
                                            </tr>
                                        );
                                    }) : null
                            }
                        </tbody>
                    </Table>
                </div>
                <div>
                    Laporan Biaya Lain Lain
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                                <th>Keterangan</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.adtFormDatas ?
                                    data.adtFormDatas.map((formData, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{formData.desc}</td>
                                                <td>{formData.price}</td>
                                            </tr>
                                        );
                                    }) : null
                            }

                        </tbody>
                    </Table>
                </div>
                <div>
                    <Row>
                        <Col sm={4}>Total Belanja</Col>
                        <Col sm={8}>{getTotalPrice()}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Uang Belanja</Col>
                        <Col sm={8}>{data.allowance}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Sisa Uang</Col>
                        <Col sm={8}>{data.remaining}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>Selisih</Col>
                        <Col sm={8}>{(data.allowance - data.remaining) - getTotalPrice()}</Col>
                    </Row>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
}