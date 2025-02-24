import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ReportsLayer from "../components/ReportsLayer";


const ReportsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* ReportsLayer */}
        <ReportsLayer />



      </MasterLayout>
    </>
  );
};

export default ReportsPage;
