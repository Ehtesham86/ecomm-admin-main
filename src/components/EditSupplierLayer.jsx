import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Chip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';

import 'dayjs/locale/en-gb';

dayjs.locale('en-gb');

const EditSupplierLayer = () => {
    const [supplierData, setSupplierData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { supplierId } = useParams();
    const [selectedDates, setSelectedDates] = useState([]);
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    const fetchSupplier = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/get-supplier/${supplierId}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.supplier.length > 0 ? response.data.supplier[0] : [];
            setSupplierData(data);
            setImagePreview(baseURL + data?.icon);
            setSelectedDates(data?.holidays?.holidays.map(dayjs) || []);
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    const handleDateChange = (newDate) => {
        setSelectedDates([...selectedDates, new Date(newDate).toLocaleDateString('en-GB')]);
    };

    const removeDate = (dateToRemove) => {
        setSelectedDates(selectedDates.filter(date => !dayjs(date).isSame(dayjs(dateToRemove, 'DD-MM-YYYY'))));
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

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", supplierData?._id);
        formData.append("name", supplierData?.name);
        formData.append("email", supplierData?.email);
        formData.append("phone", supplierData?.phone);
        formData.append("streetAddress", supplierData?.address?.street);
        formData.append("city", supplierData?.address?.city);
        formData.append("postalCode", supplierData?.address?.postcode);
        formData.append("status", supplierData?.status);
        formData.append("holidays", JSON.stringify(selectedDates.map(date => new Date(date).toLocaleDateString('en-GB'))));

        if (fileInputRef.current?.files[0]) {
            formData.append("logo", fileInputRef.current.files[0]);
        }

        try {
            await axios.post(`${baseURL}/api/update-supplier`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
            alert("Supplier updated successfully");
            navigate(-1);
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    useEffect(() => {
        fetchSupplier();
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    useEffect(() => {
        if (supplierData) {
            console.log(supplierData);
            setSelectedDates(supplierData?.holidays?.holidays?.map(dayjs) || []);
        }
    }, [supplierData]);

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <h6 className="text-md text-primary-light mb-16">Supplier Logo</h6>
                <div className="upload-image-wrapper d-flex align-items-center gap-3">
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
                    <input
                        id="upload-file"
                        type="file"
                        onChange={handleFileChange}
                        hidden
                        ref={fileInputRef}
                        accept="image/*"
                    />
                </div>
                <form onSubmit={handleSave} className="row">
                    <div className="mb-20 col-6">
                        <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Supplier Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Supplier Name"
                            value={supplierData?.name || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Email Address <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control radius-8"
                            id="email"
                            placeholder="Enter Supplier Email Address"
                            value={supplierData?.email || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Phone NUmber <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="phone"
                            placeholder="Enter Supplier Phone Number"
                            value={supplierData?.phone || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, phone: e.target.value })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="streetAddress" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Street Address <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="streetAddress"
                            placeholder="Enter Street Address"
                            value={supplierData?.address?.street || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, address: { ...supplierData.address, street: e.target.value } })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="city" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            City <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="city"
                            placeholder="Enter City"
                            value={supplierData?.address?.city || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, address: { ...supplierData.address, city: e.target.value } })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="postalCode" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Postal Code <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="postalCode"
                            placeholder="Enter Postal Code"
                            value={supplierData?.address?.postcode || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, address: { ...supplierData.address, postcode: e.target.value } })}
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label htmlFor="status" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Status
                        </label>
                        <select
                            className="form-control radius-8"
                            id="status"
                            value={supplierData?.status || ''}
                            onChange={(e) => setSupplierData({ ...supplierData, status: e.target.value })}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
                                    label={new Date(date).toLocaleDateString('en-GB')}
                                    onDelete={() => removeDate(new Date(date).toLocaleDateString('en-GB'))}
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

export default EditSupplierLayer;
