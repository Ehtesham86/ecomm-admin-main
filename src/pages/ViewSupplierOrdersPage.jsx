import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewSupplierOrdersLayer from "../components/ViewSupplierOrdersLayer";


const ViewSupplierOrdersPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Supplier Orders" />

        {/* ViewSupplierOrdersLayer */}
        <ViewSupplierOrdersLayer />


      </MasterLayout>
    </>
  );
};

export default ViewSupplierOrdersPage;
