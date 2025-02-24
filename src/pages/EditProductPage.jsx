import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditProductLayer from "../components/EditProductLayer";


const EditProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Product" />

        {/* AddProductLayer */}
        <EditProductLayer />


      </MasterLayout>
    </>
  );
};

export default EditProductPage;
