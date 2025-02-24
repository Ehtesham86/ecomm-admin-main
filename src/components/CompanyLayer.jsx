import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyLayer = () => {
    const { user, setUser } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [profileData, setProfileData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });
    
    const [passwordData, setPasswordData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseURL}/api/update-profile`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response)
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            alert("Profile data updated");
            navigate('/company');
            setUser(response.data);
        } catch (error) {
            setErrorMessage('Error updating profile. Please try again later.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }

        try {
            await axios.put(`${baseURL}/api/update-password`, passwordData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Password updated successfully');
            setPasswordData({ password: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setPasswordError('Error updating password. Please try again later.');
        }
    };

    return (
        <>
            <div className="card h-100 p-0 radius-12 overflow-hidden mb-3">
                <div className="card-body p-40">
                    <form onSubmit={handleProfileSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="firstname" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        First Name <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="Enter First Name"
                                        value={profileData.firstname}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="lastname" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Last Name <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        value={profileData.lastname}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Email <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control radius-8"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                                <button type="submit" className="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
            <div className="card h-100 p-0 radius-12 overflow-hidden">
                <div className="card-body p-40">
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Current Password <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control radius-8"
                                        id="password"
                                        name="password"
                                        placeholder="Enter Current Password"
                                        value={passwordData.password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="newPassword" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        New Password <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control radius-8"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="Enter New Password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Confirm Password <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control radius-8"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                                <button type="submit" className="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CompanyLayer;
