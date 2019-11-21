import React, { useState } from 'react';

import { firebaseApp } from '../utils/Firebase';

import { Container, Jumbotron, Row, Col, Form, Button } from 'react-bootstrap';

const DOMAIN_EXTENSION = "decodesmedia.com";

export default () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signIn() {
        const email = username + "@" + DOMAIN_EXTENSION;
        
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            window.alert(error.message)
        });
    }

    return (
        <Container >
            <Row className="justify-content-center">
                <Col md="3"></Col>
                <Col md="6">
                    <Jumbotron>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)}  type="password" />
                            <br />
                            <Button variant="primary" block onClick={signIn}>Login</Button>
                        </Col>
                    </Jumbotron>
                </Col>
                <Col md="3"></Col>
            </Row>
        </Container>
    );
}