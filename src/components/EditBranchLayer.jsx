import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBranchLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        paymentMethod: '',
        status: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch branch data
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const response = await fetch(`${baseURL}/api/get-branch/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const resData = {
                        id: data.branch[0]?._id,
                        name: data.branch[0]?.firstname,
                        email: data.branch[0]?.email,
                        streetAddress: data.branch[0]?.address?.street,
                        city: data.branch[0]?.address?.city,
                        postalCode: data.branch[0]?.address?.postcode,
                        paymentMethod: data.branch[0]?.paymentMethod,
                        status: data.branch[0]?.status,
                    };
                    setFormData(resData);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch shop data');
                }
            } catch (err) {
                console.error('Error:', err);
                setError('An error occurred while fetching shop data');
            }
        };

        fetchBranchData();
    }, [id, token]);

    const handleChange = (e) => {
        const { id, value } = e.target;
    
        setFormData((prev) => {
            if (id.includes('.')) {
                const keys = id.split('.');
                return {
                    ...prev,
                    [keys[0]]: {
                        ...prev[keys[0]],
                        [keys[1]]: value,
                    },
                };
            } else {
                return { ...prev, [id]: value };
            }
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/api/update-branch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Shop updated successfully!');
                setError('');
                setTimeout(() => navigate('/shops-list'), 2000);
            } else {
                setError(result.message || 'Failed to update shop');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while updating the shop');
        }
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <form onSubmit={handleSubmit} className="row">
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Shop Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Shop Name"
                            value={formData?.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="email"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Shop Email <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control radius-8"
                            id="email"
                            placeholder="Enter Shop Email"
                            value={formData?.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="streetAddress"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Street Address <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="streetAddress"
                            placeholder="Enter Street Address"
                            value={formData?.streetAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="city"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            City <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="city"
                            placeholder="Enter City"
                            value={formData?.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="postalCode"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Postcode <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="postalCode"
                            placeholder="Enter Postcode"
                            value={formData?.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="paymentMethod"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Payment Method
                            <span className="text-danger-600">*</span>
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="paymentMethod"
                            value={formData?.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                Select Payment Method
                            </option>
                            <option value="COD">COD</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="status"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Status
                            <span className="text-danger-600">*</span>
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="status"
                            value={formData?.status}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    {error && <div className="text-danger mb-10 text-center">{error}</div>}
                    {success && <div className="text-success mb-10 text-center">{success}</div>}
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

export default EditBranchLayer;
