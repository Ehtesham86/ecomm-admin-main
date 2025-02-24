import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddShopLayer = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        paymentMethod: '',
        status: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/api/create-branch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Shop created successfully!');
                setError('');
                setTimeout(() => navigate('/shops-list'), 2000);
            } else {
                setError(result.message || 'Failed to create shop');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while creating the shop');
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
                            value={formData.name}
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
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="email"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Shop Password <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="password"
                            className="form-control radius-8"
                            id="password"
                            placeholder="Enter Shop Password"
                            value={formData.password}
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
                            value={formData.streetAddress}
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
                            value={formData.city}
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
                            value={formData.postalCode}
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
                            value={formData.paymentMethod}
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
                            value={formData.status}
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

export default AddShopLayer;
