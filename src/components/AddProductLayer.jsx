import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductLayer = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [vat, setVat] = useState(false);
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const baseURL = process.env.REACT_APP_BASE_URL;

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
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/get-categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    setCategories(response.data.categories);  // Update state with categories
                } else {
                    alert('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('An error occurred while fetching categories');
            }
        };

        // Fetch suppliers from the backend
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/get-suppliers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    setSuppliers(response.data.suppliers);  // Update state with suppliers
                } else {
                    alert('Failed to fetch suppliers');
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                alert('An error occurred while fetching suppliers');
            }
        };

        fetchCategories();
        fetchSuppliers();
    }, [token]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('sku', sku);
        formData.append('price', price);
        formData.append('vat', vat);
        formData.append('category', category);
        formData.append('supplier', supplier);
        formData.append('status', status);
        formData.append('description', description);
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            // Make a POST request to the backend API
            const response = await axios.post(`${baseURL}/api/add-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                navigate('/products-list');  // Redirect to the products list page after successful creation
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred while adding the product');
        }
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
                <h6 className="text-md text-primary-light mb-16">Product Image</h6>
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
                <form onSubmit={handleFormSubmit} className='row'>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Product Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter Product Name"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="sku"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            SKU <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="sku"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="Enter product sku"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="price"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Price <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control radius-8"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product price"
                            required
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="category"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Category
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
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
                            <option value="" selected disabled>Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="vat"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            VAT <span className="text-danger-600">*</span>
                        </label><br />
                        <input
                            type="checkbox"
                            className="form-check-input radius-8"
                            id="vat"
                            checked={vat}
                            onChange={(e) => setVat(e.target.checked)}
                        />
                    </div>
                    <div className="mb-20 col-12">
                        <label
                            htmlFor="description"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control radius-8"
                            placeholder="Enter product description"
                        ></textarea>
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

export default AddProductLayer;
