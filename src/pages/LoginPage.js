import React, { useState } from 'react';

import { firebaseApp } from '../utils/Firebase';

import { Container, Jumbotron, Row, Col, Form, Button } from 'react-bootstrap';

const DOMAIN_EXTENSION = "decodesmedia.com";

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn() {
        
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            window.alert(error.message)
        });
    }

    return (
        <Container>
            <Row>
                <Col md={{span:'6', offset:'3'}}>
                    <Jumbotron>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="text" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)}  type="password" />
                            <Button className="mt-5" variant="primary" block onClick={signIn}>Login</Button>
                        </Col>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}