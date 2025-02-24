import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SupplierInvoicePreviewLayer from "../components/SupplierInvoicePreviewLayer";




const SupplierInvoicePreviewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Order - Preview" />

        {/* SupplierInvoicePreviewLayer */}
        <SupplierInvoicePreviewLayer />

      </MasterLayout>

    </>
  );
};

export default SupplierInvoicePreviewPage;
