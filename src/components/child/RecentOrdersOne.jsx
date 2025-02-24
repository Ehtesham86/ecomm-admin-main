import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecentOrdersOne = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);

    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.get(`${baseURL}/api/get-all-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setOrders(response.data.orders);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
                setError('Error fetching order');
            });
    }, [token, baseURL]);

    const currentOrders = orders.slice(0, 5);

    return (
        <div className="col-xxl-12 col-lg-12">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Recent Orders</h6>
                        <Link
                            to="/order-list"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            View All
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">S.L</th>
                                    <th scope="col">Shop</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                            <td><Skeleton width={20} /></td>
                                            <td><Skeleton width={100} /></td>
                                            <td><Skeleton width={80} /></td>
                                            <td><Skeleton width={60} /></td>
                                            <td><Skeleton width={120} /></td>
                                            <td><Skeleton circle width={32} height={32} /></td>
                                        </tr>
                                    ))
                                    : currentOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {order?.branch?.firstname}
                                            </td>
                                            <td>
                                                {new Date(order?.createdAt).toLocaleDateString('en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td>&#xa3; {order?.totalPrice}</td>
                                            <td>{order?.status}</td>
                                            <td>
                                                <Link
                                                    to={`/order-view/${order._id}`}
                                                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                >
                                                    <Icon icon="iconamoon:eye-light" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentOrdersOne;
