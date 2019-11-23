import React from 'react';

import { Modal, Button } from 'react-bootstrap';

export default ({ show, handleClose, handleConfirmation}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hapus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Apa anda yakin ingin menghapus?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleConfirmation}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}