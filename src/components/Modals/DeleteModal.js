import React from 'react';

import { Modal, Button } from "react-bootstrap";

export default ({show, handleClose, handleConfirmation}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hapus Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Apa anda yakin ingin menghapus?</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={handleConfirmation}>Hapus</Button>
            </Modal.Footer>
        </Modal>
    );
}