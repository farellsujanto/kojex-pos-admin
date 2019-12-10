import React, { useState, useEffect, useContext } from 'react';
import { ItemsContext } from '../store/Context';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import {
    Card,
    CardHeader,
    Col
} from "reactstrap";

function ItemListPage() {

    const [items] = useContext(ItemsContext);
    const [itemDatas, setItemDatas] = useState([[]]);

    useEffect(() => {
        let newItems = [];
        items.forEach((item, index) => {
            const newItem = [
                index + 1,
                item.nick,
                item.name,
                item.stock,
            ];
            newItems.push(newItem);
        });
        setItemDatas(newItems);
    }, [items]);

    const headers = ["#", "Nama Produk", "Nama Dagang", "Stock"];
    const suffix = ["", "", "", ""];

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Card tables</h3>
                    </CardHeader>
                    <DataTables items={itemDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>
        </>
    );
}

export default ItemListPage;