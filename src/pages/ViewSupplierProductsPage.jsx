import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SupplierProductsListLayer from "../components/SupplierProductsListLayer";


const ViewSupplierProductsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Supplier Products" />

        {/* SupplierProductsListLayer */}
        <SupplierProductsListLayer />


      </MasterLayout>
    </>
  );
};

export default ViewSupplierProductsPage;
