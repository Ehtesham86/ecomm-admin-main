import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProductListLayer from "../components/ProductListLayer";



const ProductListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Products List" />

        {/* ProductListLayer */}
        <ProductListLayer />

      </MasterLayout>

    </>
  );
};

export default ProductListPage;
