import React, { useState, useEffect } from 'react';
import SalesReport from './child/SalesReport'

const ReportsLayer = () => {

    return (
        <section className="row gy-4">

            {/* RecentOrdersOne */}
            <SalesReport />

        </section>


    )
}

export default ReportsLayer