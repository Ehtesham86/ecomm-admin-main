import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BranchListLayer from "../components/BranchListLayer";




const BranchListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Shops List" />

        {/* BranchListLayer */}
        <BranchListLayer />

      </MasterLayout>

    </>
  );
};

export default BranchListPage;
