import React from 'react';

import { Navbar, Button } from 'react-bootstrap';

import { firebaseApp } from '../utils/Firebase';

export default () => {

    function signOut() {
        firebaseApp.auth().signOut();
    }

    function getUsername() {
        const email = firebaseApp.auth().currentUser.email;
        const username = email.split('@');
        return username[0];
    }

    return (
        <Navbar expand="lg" variant="light" bg="light">
            {/* <Navbar.Brand href="#">Navbar</Navbar.Brand> */}
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    { getUsername() } <Button onClick={signOut} variant="link"> Keluar</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}