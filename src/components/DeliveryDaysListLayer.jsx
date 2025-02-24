import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DeliveryDaysListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [deliveryDays, setDeliveryDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deliveryDaysToDelete, setDeliveryDaysToDelete] = useState(null);
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchDeliveryDays = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/get-delivery-days`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDeliveryDays(response.data.deliveryDays || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            }
        };

        fetchDeliveryDays();
    }, []);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleDeleteClick = (delivery) => {
        setDeliveryDaysToDelete(delivery);
        setShowDeleteModal(true);
    };

    const handleDeleteDeliveryDays = async () => {
        try {
            if (deliveryDaysToDelete) {
                await axios.delete(`${baseURL}/api/delete-delivery-days/${deliveryDaysToDelete._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDeliveryDays((prevDeliveryDays) =>
                    prevDeliveryDays.filter((deliveryDays) => deliveryDays._id !== deliveryDaysToDelete._id)
                );
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeliveryDaysToDelete(null);
    };

    const totalPages = Math.ceil(deliveryDays.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentDeliveryDays = deliveryDays.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select className="form-select form-select-sm w-auto" defaultValue="10" onChange={handleEntriesPerPageChange}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="icon-field">
                        <input
                            type="text"
                            name="search"
                            className="form-control form-control-sm w-auto"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span className="icon">
                            <Icon icon="ion:search-outline" />
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <Link to="/add-delivery-days" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Delivery Days
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check style-check d-flex align-items-center">
                                    <label className="form-check-label" htmlFor="checkAll">
                                        S.L
                                    </label>
                                </div>
                            </th>
                            <th scope="col">Shop</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Days</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array(entriesPerPage).fill().map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton width={30} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton height={30} width={30} circle /><Skeleton height={30} width={30} circle /></td>
                                </tr>
                            ))
                        ) : (
                            currentDeliveryDays.map((deliveryDays, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="form-check style-check d-flex align-items-center">
                                            <label className="form-check-label" htmlFor={`check${index + 1}`}>
                                                {startIndex + index + 1}
                                            </label>
                                        </div>
                                    </td>
                                    <td>{deliveryDays?.branch.firstname}</td>
                                    <td>{deliveryDays?.supplier.name}</td>
                                    <td>
                                        {deliveryDays?.days.map((day) => (
                                            <>{day + ' ,'}</>
                                        ) )}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/edit-delivery-days/${deliveryDays?._id}`}
                                            className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                        >
                                            <Icon icon="lucide:edit" />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                            onClick={() => handleDeleteClick(deliveryDays)}
                                        >
                                            <Icon icon="mingcute:delete-2-line" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4">
                    <div className="d-flex align-items-center gap-3">
                        <span>
                            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, deliveryDays.length)} of {deliveryDays.length} entries
                        </span>
                    </div>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <Icon icon="ep:d-arrow-left" className="text-xl" />
                            </Link>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className="page-item">
                                <Link
                                    className={`page-link ${index + 1 === currentPage ? 'bg-primary-600 text-white' : 'bg-primary-50 text-secondary-light'} fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px`}
                                    to="#"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <Icon icon="ep:d-arrow-right" className="text-xl" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#00000066' }}>
                    <div className="modal-content" style={{ width: '500px', height: 'auto', padding: '10px' }}>
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <b>Are you sure you want to delete delivery days?</b>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            <button
                                onClick={handleDeleteDeliveryDays}
                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleCloseDeleteModal}
                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryDaysListLayer;
