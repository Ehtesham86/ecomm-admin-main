import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SignInLayer = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${baseURL}/api/auth/login`;
            const response = await axios.post(url, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            });
            login(response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <section className="auth bg-base d-flex flex-wrap" style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <Link to="/" className="mb-40 d-flex justify-content-center">
                            <img src="/assets/images/logo.png" alt="" />
                        </Link>
                        <h4 className="mb-12">Sign In to your Account</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Welcome back! please enter your detail
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="mage:email" />
                            </span>
                            <input
                                type="email"
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <span
                                className="toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                onClick={togglePasswordVisibility}
                                style={{ marginTop: '-5px' }}
                            >
                                <Icon
                                    icon={showPassword ? 'ri-eye-close-line' : 'ri-eye-line'}
                                />
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            {" "}
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default SignInLayer