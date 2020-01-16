import React from 'react';

import SalesGraph from '../components/Graphs/SalesGraph';

// import { firebaseApp } from '../utils/Firebase';

import {
    Button,
    Card,
    CardHeader,
    Progress,
    Table,
    Row,
    Col
} from 'reactstrap';

export default () => {

    return (
        <>
            <Col className="mb-5 mb-xl-0" xl="12">
                <SalesGraph />
            </Col>
        </>
    );
}