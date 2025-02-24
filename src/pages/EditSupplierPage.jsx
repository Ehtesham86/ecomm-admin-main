import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditSupplierLayer from "../components/EditSupplierLayer";


const EditSupplierPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Supplier" />

        {/* EditSupplierLayer */}
        <EditSupplierLayer />


      </MasterLayout>
    </>
  );
};

export default EditSupplierPage;
