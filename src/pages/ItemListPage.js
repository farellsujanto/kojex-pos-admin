import React, { useState, useEffect, useContext } from 'react';
import { ItemsContext } from '../store/Context';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import DeleteModal from '../components/Modals/DeleteModal';
import AddItemModal from '../components/Modals/AddItemModal';
import EditItemModal from '../components/Modals/EditItemModal';

import {
    Card,
    CardHeader,
    Col,
    Nav,
    NavItem,
    Button,
} from "reactstrap";

const HEADERS = ["#", "Nama Produk", "Nama Dagang", "Stock", "", ""];
const SUFFIX = ["", "", "", "", "FUN", "FUN"];


function ItemListPage() {

    const [items] = useContext(ItemsContext);
    const [itemDatas, setItemDatas] = useState([[]]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({
        composition: '', name: '', nick: '', series: '', stock: 0, priceList: []
    }); 
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        let newItems = [];
        items.forEach((item, index) => {
            const newItem = [
                index + 1,
                item.nick,
                item.name,
                item.stock,
                {
                    fun: () => {
                        prepareToEdit(item);
                    },
                    name: "Edit",
                    variant: "primary"
                },
                {
                    fun: () => {
                        prepareForDeletion(item.id);
                    },
                    name: "Hapus",
                    variant: "danger"
                }
            ];
            newItems.push(newItem);
        });
        setItemDatas(newItems);
    }, [items]);

    function prepareToEdit(item) {
        setItemToEdit(item);
        setShowEditModal(true);
    }

    function prepareForDeletion(id) {
        setIdToDelete(id);
        setShowDeleteModal(true)
    }

    function deleteItemFromId() {
        firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('items')
            .doc(idToDelete)
            .delete()
            .then(() => {
                window.alert("Jasa berhasil dihapus!");
                setShowDeleteModal(false);
            })
            .catch((e) => {
                console.log(e);
                window.alert("Terjadi kesalahan, silahkan coba lagi");
            });
    }

    return (
        <>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <div className="col">
                            <h3 className="mb-0">Item List</h3>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <Button color="success" onClick={() => setShowAddModal(true)}>+ Tambah</Button>
                                </NavItem>
                            </Nav>
                        </div>
                    </CardHeader>
                    <DataTables items={itemDatas} headers={HEADERS} suffix={SUFFIX} />
                </Card>
            </Col>
            <AddItemModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
            />
            <EditItemModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                itemData={itemToEdit}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteItemFromId}
            />
        </>
    );
}

export default ItemListPage;