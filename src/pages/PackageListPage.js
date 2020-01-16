import React, { useState, useEffect, useContext } from 'react';
import { PackagesContext } from '../store/Context';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import DeleteModal from '../components/Modals/DeleteModal';
import AddPackageModal from '../components/Modals/AddPackageModal';

import {
    Card,
    CardHeader,
    Col,
    Nav,
    NavItem,
    Button,
} from "reactstrap";

const HEADERS = ["#", "Nama Paket", "Harga", "Barang", ""];
const SUFFIX = ["", "", "CURR", "", "FUN"];


function PackageListPage() {

    const [itemDatas, setItemDatas] = useState([[]]);
    const [packages] = useContext(PackagesContext);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditStockModal, setShowEditStockModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({
        composition: '', name: '', nick: '', series: '', stock: 0, priceList: []
    });
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        let newItems = [];
        packages.forEach((data, index) => {
            console.log(data)
            const newItem = [
                index + 1,
                data.name,
                data.price,
                JSON.stringify(data.items),
                {
                    fun: () => {
                        prepareForDeletion(data.id);
                    },
                    name: "Hapus",
                    variant: "danger"
                }
            ];
            newItems.push(newItem);
        });
        setItemDatas(newItems);
    }, [packages]);

    function prepareToEdit(item) {
        setItemToEdit(item);
        setShowEditModal(true);
    }

    function prepareForDeletion(id) {
        setIdToDelete(id);
        setShowDeleteModal(true)
    }

    function prepareToEditStock(item) {
        setItemToEdit(item);
        setShowEditStockModal(true);
    }

    function deleteItemFromId() {
        firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('packages')
            .doc(idToDelete)
            .delete()
            .then(() => {
                window.alert("Paket berhasil dihapus!");
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

            <AddPackageModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteItemFromId}
            />
        </>
    );
}

export default PackageListPage;