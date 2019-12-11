import React, { useState, useEffect, useContext } from 'react';

import { StaffContext } from '../store/Context';

import { firebaseApp } from '../utils/Firebase';

import {
    Card,
    CardHeader,
    Col,
    Nav,
    NavItem,
    Button,
} from "reactstrap";

import DataTables from '../components/DataTables';
import DeleteModal from '../components/Modals/DeleteModal';
import AddStaffModal from '../components/Modals/AddStaffModal';

export default () => {

    const [staffs] = useContext(StaffContext);
    const [staffDatas, setStaffDatas] = useState([[]]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        let newStaffs = [];
        staffs.forEach((staff, index) => {
            newStaffs.push([
                index + 1,
                staff.name,
                staff.role,
                {
                    fun: () => {
                        prepareForDeletion(staff.id);
                    },
                    name: "Hapus",
                    variant: "danger"
                }
            ]);
        });
        setStaffDatas(newStaffs);
    }, [staffs]);

    const headers = ["#", "Nama", "Pekerjan", ""];
    const suffix = ["", "", "", "FUN"];

    function prepareForDeletion(id) {
        setIdToDelete(id);
        setShowDeleteModal(true);
    }

    function deleteId() {
        firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('staffs')
            .doc(idToDelete)
            .delete()
            .then(() => {
                window.alert("Staff berhasil dihapus!");
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
                            <h3 className="mb-0">Staff List</h3>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <Button color="success" onClick={() => setShowAddModal(true)}>+ Tambah</Button>
                                </NavItem>
                            </Nav>
                        </div>
                    </CardHeader>
                    <DataTables items={staffDatas} headers={headers} suffix={suffix} />
                </Card>
            </Col>

            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteId}
            />
            <AddStaffModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
            />
        </>
    );
}