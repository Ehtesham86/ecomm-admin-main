import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';

const SupplierProductsListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;
    const { supplierId } = useParams();

    useEffect(() => {
        const url = `${baseURL}/api/get-products-by-suppliers/${supplierId}`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setProducts(response.data.products || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
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

    const filteredProducts = products.filter(product => {
        const matchesStatus = statusFilter === 'All' || product?.status === statusFilter;
        const matchesSearchTerm =
            product?.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearchTerm;
    });

    const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderSkeletonRows = () => (
        Array.from({ length: entriesPerPage }).map((_, index) => (
            <tr key={index}>
                <td><Skeleton width={20} /></td>
                <td><Skeleton circle width={32} height={32} /><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={80} /></td>
                <td><Skeleton width={80} /></td>
                <td><Skeleton width={120} /></td>
                <td><Skeleton circle width={32} height={32} /><Skeleton circle width={32} height={32} /></td>
            </tr>
        ))
    );

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
                    <select className="form-select form-select-sm w-auto" value={statusFilter} onChange={handleStatusFilterChange}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <Link to="/products-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Product
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
                            <th scope="col">Product Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Price</th>
                            <th scope="col">VAT</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? renderSkeletonRows() : currentProducts.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="form-check style-check d-flex align-items-center">
                                        <label className="form-check-label" htmlFor={`check${index + 1}`}>
                                            {startIndex + index + 1}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={baseURL + product?.image}
                                            alt={product?.name}
                                            className="flex-shrink-0 me-12 radius-8"
                                            width={50}
                                        />
                                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                            {product?.name}
                                        </h6>
                                    </div>
                                </td>
                                <td>{product?.category?.name}</td>
                                <td>{product?.supplier?.name}</td>
                                <td>{product?.price}</td>
                                <td>{product?.vat}</td>
                                <td>
                                    <span className={`bg-${product?.status === 'Active' ? 'success' : 'warning'}-focus text-${product?.status === 'Active' ? 'success' : 'warning'}-main px-24 py-4 rounded-pill fw-medium text-sm`}>
                                        {product?.status}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/products-edit/${product?._id}`} className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center">
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
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredProducts.length)} of {filteredProducts.length} entries
                    </span>
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
        </div>
    );
};

export default SupplierProductsListLayer;
