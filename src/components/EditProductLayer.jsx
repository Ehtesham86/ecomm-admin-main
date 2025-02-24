import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProductLayer = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        sku: '',
        price: '',
        vat: '',
        category: '',
        supplier: '',
        status: '',
        description: '',
        image: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { productId } = useParams();
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const baseURL = process.env.REACT_APP_BASE_URL;

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
                    setCategories(response.data?.categories);
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
                    setSuppliers(response.data.suppliers);
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

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`${baseURL}/api/get-product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProductData({
                    id: data.product.length > 0 ? data.product[0]?._id : '',
                    name: data.product.length > 0 ? data.product[0]?.name : '',
                    sku: data.product.length > 0 ? data.product[0]?.sku : '',
                    price: data.product.length > 0 ? data.product[0]?.price : '',
                    vat: data.product.length > 0 ? (data.product[0]?.vat == 20 ? true : false) : '',
                    category: data.product.length > 0 ? data.product[0]?.category?._id : '',
                    supplier: data.product.length > 0 ? data.product[0]?.supplier?._id : '',
                    status: data.product.length > 0 ? data.product[0]?.status : '',
                    description: data.product.length > 0 ? data.product[0]?.description : '',
                    image: baseURL + data.product.length > 0 ? data.product[0]?.image : '',
                });
                setImagePreview(baseURL + data.product[0]?.image);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [productId]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', productData?.id);
        formData.append('name', productData?.name);
        formData.append('sku', productData?.sku);
        formData.append('price', productData?.price);
        formData.append('vat', productData?.vat);
        formData.append('category', productData?.category);
        formData.append('supplier', productData?.supplier);
        formData.append('status', productData?.status);
        formData.append('description', productData?.description);
        
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            const response = await axios.post(`${baseURL}/api/update-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                navigate('/products-list');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product');
        }
    };

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
                <form onSubmit={handleSubmit} className="row">
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
                            placeholder="Enter Product Name"
                            value={productData.name}
                            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
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
                            placeholder="Enter product sku"
                            value={productData.sku}
                            onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
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
                            placeholder="Enter product price"
                            value={productData.price}
                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
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
                            value={productData.category}
                            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
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
                            value={productData.supplier}
                            onChange={(e) => setProductData({ ...productData, supplier: e.target.value })}
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
                            Status <span className="text-danger-600">*</span>
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="status"
                            value={productData.status}
                            onChange={(e) => setProductData({ ...productData, status: e.target.value })}
                        >
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
                            checked={productData.vat}
                            onChange={(e) => setProductData({ ...productData, vat: e.target.checked })}
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
                            className="form-control radius-8"
                            id="description"
                            rows="3"
                            placeholder="Enter product description"
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
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

export default EditProductLayer;
