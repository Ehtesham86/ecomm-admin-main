import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Chip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';

const AddSupplierLayer = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [selectedDates, setSelectedDates] = useState([]);
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [status, setStatus] = useState('');
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleDateChange = (newDate) => {
        setSelectedDates([...selectedDates, newDate]);
    };

    const removeDate = (dateToRemove) => {
        setSelectedDates(selectedDates.filter(date => !dayjs(date).isSame(dateToRemove)));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const src = URL.createObjectURL(e.target.files[0]);
            setImagePreview(src);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (fileInputRef.current.files.length > 0) {
            formData.append('image', fileInputRef.current.files[0]);
        }
        formData.append('name', supplierName);
        formData.append('email', supplierEmail);
        formData.append('phone', supplierPhone);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('postcode', postalCode);
        formData.append('holidays', selectedDates);
        formData.append('status', status);

        axios
        .post(`${baseURL}/api/create-supplier`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            setLoading(false);
            navigate('/suppliers-list');
        })
        .catch((error) => {
            setLoading(false);
            setError(error.response?.data?.message || 'Error adding category');
        });
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <h6 className="text-md text-primary-light mb-16">Supplier Logo</h6>
                {/* Upload Image Start */}
                <div className="upload-image-wrapper d-flex align-items-center gap-3">
                    {/* Image preview section */}
                    {imagePreview ? (
                        <div className="uploaded-img position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                            <button
                                type="button"
                                onClick={removeImage}
                                className="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex"
                                aria-label="Remove uploaded image"
                            >
                                <Icon
                                    icon="radix-icons:cross-2"
                                    className="text-xl text-danger-600"
                                ></Icon>
                            </button>
                            <img
                                id="uploaded-img__preview"
                                className="w-100 h-100 object-fit-cover"
                                src={imagePreview}
                                alt="Preview"
                            />
                        </div>
                    ) : (
                        <label
                            className="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1"
                            htmlFor="upload-file"
                        >
                            <Icon
                                icon="solar:camera-outline"
                                className="text-xl text-secondary-light"
                            ></Icon>
                            <span className="fw-semibold text-secondary-light">Upload</span>
                        </label>
                    )}

                    {/* Always render the input, but hide it */}
                    <input
                        id="upload-file"
                        type="file"
                        onChange={handleFileChange}
                        hidden
                        ref={fileInputRef}
                        accept="image/*" // Optional: restrict to image files
                    />
                </div>
                {/* Upload Image End */}
                <form onSubmit={handleSubmit} className='row'>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Supplier Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            placeholder="Enter Supplier Name"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="email"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Email Address <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control radius-8"
                            id="email"
                            value={supplierEmail}
                            onChange={(e) => setSupplierEmail(e.target.value)}
                            placeholder="Enter Supplier Email Address"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="phone"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Phone Number <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="phone"
                            value={supplierPhone}
                            onChange={(e) => setSupplierPhone(e.target.value)}
                            placeholder="Enter Supplier Phone Numebr"
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
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="Enter Street Address"
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter City"
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
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Enter Postcode"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="status"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Status
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option disabled selected>
                                Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Holidays
                        </label><br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={null}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select holiday dates"
                                        variant="outlined"
                                        className="form-control radius-8 mb-8"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <div>
                            {selectedDates.map((date, index) => (
                                <Chip
                                    key={index}
                                    label={dayjs(date).format('DD-MM-YYYY')}
                                    onDelete={() => removeDate(date)}
                                    className="me-2 mb-2"
                                />
                            ))}
                        </div>
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

export default AddSupplierLayer;