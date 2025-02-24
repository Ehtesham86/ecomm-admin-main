import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditBranchLayer from "../components/EditBranchLayer";


const EditBranchPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Shop" />

        {/* EditBranchLayer */}
        <EditBranchLayer />


      </MasterLayout>
    </>
  );
};

export default EditBranchPage;
