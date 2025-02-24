import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';

const ViewdBranchOrdersLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const url = `${baseURL}/api/get-orders-for-branch/${id}`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setOrders(response.data.order || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, [token, baseURL]);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearchTerm =
            order?.branch?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order?.supplier?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order?.totalPrice.toString().includes(searchTerm) ||
            order?.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
    });

    const totalPages = Math.ceil(filteredOrders.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderSkeletonRows = () => (
        Array.from({ length: entriesPerPage }).map((_, index) => (
            <tr key={index}>
                <td><Skeleton width={20} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={80} /></td>
                <td><Skeleton width={120} /></td>
                <td><Skeleton circle width={32} height={32} /></td>
            </tr>
        ))
    );

    return (
        <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select
                            className="form-select form-select-sm w-auto"
                            defaultValue="10"
                            onChange={handleEntriesPerPageChange}
                            disabled={loading}
                        >
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
                            disabled={loading}
                        />
                        <span className="icon">
                            <Icon icon="ion:search-outline" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">S.L</th>
                            <th scope="col">Shop</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Delivery Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? renderSkeletonRows() : currentOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>{order?.branch?.firstname}</td>
                                <td>
                                    {new Date(order?.createdAt).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td>
                                    {new Date(order?.deliveryDate).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td>{order?.totalPrice}</td>
                                <td>{order?.status}</td>
                                <td>
                                    <Link
                                        to={`/order-view/${order?._id}`}
                                        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="iconamoon:eye-light" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && (
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
                        <span>
                            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredOrders.length)} of {filteredOrders.length} entries
                        </span>
                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <li className="page-item">
                                <Link
                                    className="page-link"
                                    to="#"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <Icon icon="ep:d-arrow-left" />
                                </Link>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className="page-item">
                                    <Link
                                        className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}
                                        to="#"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className="page-item">
                                <Link
                                    className="page-link"
                                    to="#"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <Icon icon="ep:d-arrow-right" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewdBranchOrdersLayer;
