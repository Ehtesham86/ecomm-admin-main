import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TransactionListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const url = `${baseURL}/api/get-transactions`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setTransactions(response.data.transactions);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            });
    }, [token, baseURL]);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
        const matchesSearchTerm =
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.tnx_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.date.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearchTerm;
    });

    const totalPages = Math.ceil(filteredTransactions.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, startIndex + entriesPerPage);

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
                <td><Skeleton width={120} /></td>
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
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <select className="form-select form-select-sm w-auto" value={statusFilter} onChange={handleStatusFilterChange}>
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <Link to="/transaction-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Transaction
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">S.L</th>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Shop</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? renderSkeletonRows() : currentTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>{transaction.tnx_id}</td>
                                <td>{transaction.branch}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                                <td>
                                    <span className={`bg-${transaction.status === 'Paid' ? 'success' : 'warning'}-focus text-${transaction.status === 'Paid' ? 'success' : 'warning'}-main px-24 py-4 rounded-pill fw-medium text-sm`}>
                                        {transaction.status}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/transaction-edit/${transaction.id}`} className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                        <Icon icon="lucide:edit" />
                                    </Link>
                                    <Link to="#" className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                        <Icon icon="mingcute:delete-2-line" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
                    </span>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <Icon icon="ep:d-arrow-left" className="text-xl" />
                            </Link>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className="page-item">
                                <Link
                                    className={`page-link ${index + 1 === currentPage ? 'bg-primary-600 text-white' : 'bg-primary-50 text-secondary-light'} fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px`}
                                    to="#"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <Icon icon="ep:d-arrow-right" className="text-xl" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TransactionListLayer;
