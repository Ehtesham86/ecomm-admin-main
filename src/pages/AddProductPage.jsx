import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddProductLayer from "../components/AddProductLayer";


const AddProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add Product" />

        {/* AddProductLayer */}
        <AddProductLayer />


      </MasterLayout>
    </>
  );
};

export default AddProductPage;
