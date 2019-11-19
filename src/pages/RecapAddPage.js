import React from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default () => {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Tanggal Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="date"/>
                    </Col>
                </Form.Group>
            </Form>
            <Button type="submit">Sign in</Button>
        </Container>
    );
}