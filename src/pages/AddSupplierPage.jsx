import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddSupplierLayer from "../components/AddSupplierLayer";


const AddSupplierPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add Supplier" />

        {/* AddSupplierLayer */}
        <AddSupplierLayer />


      </MasterLayout>
    </>
  );
};

export default AddSupplierPage;
