import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditCategoryLayer from "../components/EditCategoryLayer";


const EditCategoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Category" />

        {/* EditCategoryLayer */}
        <EditCategoryLayer />


      </MasterLayout>
    </>
  );
};

export default EditCategoryPage;
