import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddBranchLayer from "../components/AddBranchLayer";


const ViewSupplierPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Supplier" />

        {/* AddBranchLayer */}
        <AddBranchLayer />


      </MasterLayout>
    </>
  );
};

export default ViewSupplierPage;
