import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CategoryListLayer from "../components/CategoryListLayer";




const CategoryListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Categories List" />

        {/* CategoryListLayer */}
        <CategoryListLayer />

      </MasterLayout>

    </>
  );
};

export default CategoryListPage;
