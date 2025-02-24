import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const url = `${baseURL}/api/get-categories`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setCategories(response.data.categories || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
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

    const filteredCategories = categories.filter(category => {
        return category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredCategories.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentCategories = filteredCategories.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderSkeletonRows = () => (
        Array.from({ length: entriesPerPage }).map((_, index) => (
            <tr key={index}>
                <td><Skeleton width={120} /></td>
                <td><Skeleton width={120} /></td>
                <td><Skeleton circle width={32} height={32} /><Skeleton circle width={32} height={32} /></td>
            </tr>
        ))
    );

    // Handle delete category
    const handleDeleteCategory = (id) => {
        setCategoryToDelete(id);
        setDeleteModalVisible(true);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            axios.delete(`${baseURL}/api/delete-category/${categoryToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setCategories(categories.filter(category => category?._id !== categoryToDelete)); // Remove deleted category from the list
                    setDeleteModalVisible(false);
                })
                .catch((error) => {
                    console.error('Error deleting category:', error);
                    alert(error.response.data.error);
                    setDeleteModalVisible(false);
                });
        }
    };

    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setCategoryToDelete(null);
    };

    return (
        <div className="card">
            {/* Modal for confirming deletion */}
            {deleteModalVisible && (
                <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#00000066' }}>
                    <div className="modal-content" style={{ width: '500px', height: 'auto', padding: '10px' }}>
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <b>Are you sure you want to delete this category?</b>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            <button
                                onClick={confirmDeleteCategory}
                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                    <Link to="/categories-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Category
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
                            <th scope="col">Category Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? renderSkeletonRows() : currentCategories.map((category, index) => (
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
                                            src={baseURL + category?.image}
                                            alt={category?.name}
                                            className="flex-shrink-0 me-12 radius-8"
                                            width={50}
                                        />
                                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                            {category?.name}
                                        </h6>
                                    </div>
                                </td>
                                <td>
                                    <Link
                                        to={`/categories-edit/${category?._id}`}
                                        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="lucide:edit" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                        onClick={() => handleDeleteCategory(category?._id)}
                                    >
                                        <Icon icon="mingcute:delete-2-line" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredCategories.length)} of {filteredCategories.length} entries
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

export default CategoryListLayer;
