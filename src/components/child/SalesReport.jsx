import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SalesReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Today');

    const fetchReports = async (currentFilter) => {
        axios.get(`${baseURL}/api/reports/${currentFilter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setReports(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
                setLoading(false);
                setError('Error fetching report');
            });
    };

    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetchReports(filter);
    }, [filter]);

    const handleStatusFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const renderValueOrLoader = (value) => {
        if (loading || reports === null) {
            return <Icon
                icon="svg-spinners:bars-scale"
                className="text-primary text-2xl mb-0"
            />;
        }
        return value;
    };

    return (
        <div className="col-xxl-12 col-lg-12">
            <select className="form-select form-select-sm w-auto mb-3" value={filter} onChange={handleStatusFilterChange}>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Week to date">Week to date</option>
                <option value="Last week">Last week</option>
                <option value="Month to date">Month to date</option>
                <option value="Last month">Last month</option>
                <option value="Quarter to date">Quarter to date</option>
                <option value="Last quarter">Last quarter</option>
                <option value="Year to date">Year to date</option>
                <option value="Last year">Last year</option>
            </select>
            <div className="row row-cols-xxxl-4 row-cols-lg-4 row-cols-sm-2 row-cols-1 gy-4 mb-3">
                <div className="col">
                    <div className="card shadow-none breport bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Total Orders</p>
                                    <h3 className="mb-0">&#xa3; {error ? '0' : renderValueOrLoader(reports?.summary?.totalOrders)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none breport bg-gradient-start-3 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">
                                        Gross Sales
                                    </p>
                                    <h3 className="mb-0">&#xa3; {error ? '0' : renderValueOrLoader(reports?.summary?.grossSales)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none breport bg-gradient-start-2 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">
                                        Taxes
                                    </p>
                                    <h3 className="mb-0">&#xa3; {error ? '0' : renderValueOrLoader(reports?.summary?.taxesPaid)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none breport bg-gradient-start-4 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">Net Sale</p>
                                    <h4 className="mb-0">&#xa3; {error ? '0' : renderValueOrLoader(reports?.summary?.netSales)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table breported-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">S.L</th>
                                    <th scope="col">Shop</th>
                                    <th scope="col">Gross Sales</th>
                                    <th scope="col">Taxes</th>
                                    <th scope="col">Net Sale</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Delivery Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                            <td><Skeleton width={20} /></td>
                                            <td><Skeleton width={100} /></td>
                                            <td><Skeleton width={80} /></td>
                                            <td><Skeleton width={80} /></td>
                                            <td><Skeleton width={60} /></td>
                                            <td><Skeleton width={120} /></td>
                                            <td><Skeleton circle width={32} height={32} /></td>
                                        </tr>
                                    ))
                                    : reports.orderDetails.map((report, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {report?.branch?.firstname}
                                            </td>
                                            <td>&#xa3; {report?.grossSales}</td>
                                            <td>&#xa3; {report?.taxes}</td>
                                            <td>&#xa3; {report?.netSales}</td>
                                            <td>{report?.status}</td>
                                            <td>
                                                {new Date(report?.deliveryDate).toLocaleDateString('en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
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

export default SalesReport;
