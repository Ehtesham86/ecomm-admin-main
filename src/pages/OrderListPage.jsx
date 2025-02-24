import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import OrderListLayer from "../components/OrderListLayer";




const OrderListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Order - List" />

        {/* OrderListLayer */}
        <OrderListLayer />

      </MasterLayout>

    </>
  );
};

export default OrderListPage;
