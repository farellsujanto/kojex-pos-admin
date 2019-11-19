import React from 'react';

import { Navbar } from 'react-bootstrap';

export default () => {

    return (
        <Navbar expand="lg" variant="light" bg="light">
            {/* <Navbar.Brand href="#">Navbar</Navbar.Brand> */}
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Username <a href="#login"> Keluar</a>
                </Navbar.Text>
            </Navbar.Collapse>

        </Navbar>
    );
}