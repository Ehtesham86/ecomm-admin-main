import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SupplierListLayer from "../components/SupplierListLayer";




const SupplierListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Suppliers List" />

        {/* SupplierListLayer */}
        <SupplierListLayer />

      </MasterLayout>

    </>
  );
};

export default SupplierListPage;
