import React, { useState, useEffect, useContext } from 'react';
import { ServiceContext } from '../store/Context';

import DataTables from '../components/DataTables';

import DeleteModal from '../components/Modals/DeleteModal';
import AddServiceModal from '../components/Modals/AddServiceModal';
import EditServiceModal from '../components/Modals/EditServiceModal';

import { firebaseApp } from '../utils/Firebase';

import {
    Card,
    CardHeader,
    Col,
    Nav,
    NavItem,
    Button,
    CardBody
} from "reactstrap";

const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan", "", ""];
const suffix = ["", "", "CURR", " %", " %", " %", "", "FUN", 'FUN'];

export default () => {

    const [services] = useContext(ServiceContext);
    const [serviceDatas, setServiceDatas] = useState([[]]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [serviceToEdit, setServiceToEdit] = useState({
        name: '', price: 0, id: '', fee: { beautician: 0, doctor: 0, nurse: 0 }, desc: ''
    });

    useEffect(() => {
        let newServices = [];
        services.forEach((service, index) => {
            const newService = [
                index + 1,
                service.name,
                service.price,
                service.fee.beautician,
                service.fee.doctor,
                service.fee.nurse,
                service.desc,
                {
                    fun: () => {
                        prepareForEdit(service);
                    },
                    name: "Edit",
                    variant: "primary"
                },
                {
                    fun: () => {
                        prepareForDeletion(service.id);
                    },
                    name: "Hapus",
                    variant: "danger"
                }
            ];
            newServices.push(newService);
        });
        setServiceDatas(newServices);
    }, [services]);

    function prepareForDeletion(id) {
        setIdToDelete(id);
        setShowDeleteModal(true)
    }

    function prepareForEdit(service) {
        setServiceToEdit(service);
        setShowEditModal(true);
    }


    function deleteServiceFromId() {
        firebaseApp.firestore()
            .collection('clinics')
            .doc('GABRIEL')
            .collection('services')
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
                            <h3 className="mb-0">Service List</h3>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <Button color="success" onClick={() => setShowAddModal(true)}>+ Tambah</Button>
                                </NavItem>
                            </Nav>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <DataTables items={serviceDatas} headers={headers} suffix={suffix} />
                    </CardBody>

                </Card>
            </Col>

            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirmation={deleteServiceFromId}
            />

            <AddServiceModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
            />

            <EditServiceModal
                show={showEditModal}
                service={serviceToEdit}
                handleClose={() => setShowEditModal(false)}
            />
        </>
    );
}