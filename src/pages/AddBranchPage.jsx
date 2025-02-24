import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddBranchLayer from "../components/AddBranchLayer";


const AddBranchPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add Shop" />

        {/* AddBranchLayer */}
        <AddBranchLayer />


      </MasterLayout>
    </>
  );
};

export default AddBranchPage;
