import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'

const TransactionsOne = () => {
    return (
        <div className="col-xxl-3">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                        <h6 className="mb-2 fw-bold text-lg">Transactions</h6>
                        <Link
                            to="/transactions-list"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            View All
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="mt-32">
                        <div className="d-flex align-items-center justify-content-between gap-3 mb-32">
                            <div className="d-flex align-items-center gap-2">
                                <div className="flex-grow-1">
                                    <h6 className="text-md mb-0 fw-normal">Branch 1</h6>
                                    <span className="text-sm text-secondary-light fw-normal">
                                        #123456
                                    </span>
                                </div>
                            </div>
                            <span className="text-md fw-medium">$2000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsOne;