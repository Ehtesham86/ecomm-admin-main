import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewdBranchOrdersLayer from "../components/ViewdBranchOrdersLayer";


const ViewBranchOrdersPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Shop Orders" />

        {/* ViewdBranchOrdersLayer */}
        <ViewdBranchOrdersLayer />


      </MasterLayout>
    </>
  );
};

export default ViewBranchOrdersPage;
