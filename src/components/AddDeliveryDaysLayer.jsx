import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Chip } from '@mui/material';
import axios from 'axios';

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddDeliveryDaysLayer = () => {
    const navigate = useNavigate();
    const [selectedAreas, setSelectedAreas] = useState([]);
    const token = localStorage.getItem('token');
    const [branch, setBranch] = useState('');
    const [supplier, setSupplier] = useState('');
    const [branches, setBranches] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleAreaChange = (event, value) => {
        setSelectedAreas(value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/get-branches`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    setBranches(response.data.branches);
                } else {
                    alert('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('An error occurred while fetching categories');
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/get-suppliers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    setSuppliers(response.data.suppliers);
                } else {
                    alert('Failed to fetch suppliers');
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                alert('An error occurred while fetching suppliers');
            }
        };

        fetchShops();
        fetchSuppliers();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            'days': selectedAreas,
            'supplier': supplier,
            'branch': branch
        }

        axios
        .post(`${baseURL}/api/add-delivery-days`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            setLoading(false);
            navigate('/delivery-days');
        })
        .catch((error) => {
            setLoading(false);
            setError(error.response?.data?.message || 'Error adding category');
        });
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <form onSubmit={handleSubmit} className='row'>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="branch"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Shop
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8"
                            id="branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            required
                        >
                            <option value="">Select Shop</option>
                            {branches.map((branche) => (
                                <option key={branche._id} value={branche._id}>
                                    {branche.firstname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="supplier"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Supplier
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8"
                            id="supplier"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            required
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier._id} value={supplier._id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Delivery Days
                        </label>
                        <Autocomplete
                            multiple
                            options={weekDays}
                            value={selectedAreas}
                            onChange={handleAreaChange}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip key={index} label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Type to select week days"
                                    variant="outlined"
                                    className="form-control radius-8"
                                />
                            )}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDeliveryDaysLayer;