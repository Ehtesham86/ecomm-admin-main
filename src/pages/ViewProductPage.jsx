import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddBranchLayer from "../components/AddBranchLayer";


const ViewProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Product" />

        {/* AddBranchLayer */}
        <AddBranchLayer />


      </MasterLayout>
    </>
  );
};

export default ViewProductPage;
