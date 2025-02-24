import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCategoryLayer = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
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

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            setError('Category name is required.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('id', categoryId);
        formData.append('name', categoryName);
        if (fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        axios
            .post(`${baseURL}/api/update-category`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setLoading(false);
                navigate('/categories-list');
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response?.data?.message || 'Error updating category');
            });
    };

    const fetchCategoryDetails = async () => {
        try {
            const response = await fetch(`${baseURL}/api/get-category/${categoryId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (data.status) {
                setCategoryName(data.categories[0]?.name);
                setImagePreview(baseURL + data.categories[0]?.image);
            } else {
                alert('Failed to fetch category details');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, [categoryId]);

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
                <h6 className="text-md text-primary-light mb-16">Category Icon</h6>
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-20">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Category Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Category Name"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
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

export default EditCategoryLayer;
