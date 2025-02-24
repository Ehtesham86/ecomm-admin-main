import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SupplierInvoicePreviewLayer = () => {
    const { supplierId, orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        console.log(supplierId, orderId)
        axios.get(`${baseURL}/api/get-supplier-order/${supplierId}/${orderId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setOrder(response.data.order || {});
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
                setError('Error fetching order');
            });
    }, [token, supplierId, orderId, baseURL]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="card">
            <div className="card-body py-40">
                <div className="row justify-content-center" id="invoice">
                    <div className="col-lg-8">
                        <div className="shadow-4 border radius-8">
                            <div className="py-28 px-20">
                                <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
                                    <div>
                                        <img src="/assets/images/logo.png" alt="image_icon" className="mb-8" width={150} />
                                    </div>
                                    <div>
                                        <table className="text-sm text-secondary-light">
                                            <tbody>
                                                <tr>
                                                    <td>Order Date</td>
                                                    <td className="ps-8">:{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Delivery Date</td>
                                                    <td className="ps-8">:{new Date(order.deliveryDate).toLocaleDateString('en-GB')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shop</td>
                                                    <td className="ps-8">:{order?.branch?.firstname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Method</td>
                                                    <td className="ps-8">:{order.status}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-24">
                                    <div className="table-responsive scroll-sm">
                                        <table className="table bordered-table text-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-sm">
                                                        SKU
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        Item
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        Qty
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.products.map((item, index) => {
                                                    return (
                                                    <tr key={index}>
                                                        <td>{item?.details?.sku}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img
                                                                    src={baseURL + item?.details?.image}
                                                                    alt={item?.details?.name}
                                                                    className="flex-shrink-0 me-12 radius-8"
                                                                    width={50}
                                                                />
                                                                <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                                    {item?.details?.name}
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td>{item?.quantity}</td>
                                                    </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SupplierInvoicePreviewLayer;